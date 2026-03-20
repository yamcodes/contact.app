package codes.yam.contacts;

import io.github.wimdeblauwe.htmx.spring.boot.mvc.HtmxRequest;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/contacts")
@RequiredArgsConstructor
public class ContactController {
  private final ContactService contactService;
  private final jakarta.validation.Validator validator;

  @GetMapping
  public String contacts(
      @RequestParam(required = false) String q,
      @PageableDefault(sort = "last", size = 15) Pageable pageable,
      HtmxRequest htmxRequest,
      Model model) {
    var page = contactService.list(q, pageable);
    model.addAttribute("contactPage", page);
    model.addAttribute("contacts", page.getContent());
    model.addAttribute("search", q);
    model.addAttribute(
        "sort",
        pageable.getSort().stream()
            .map(o -> o.getProperty() + "," + o.getDirection().name().toLowerCase())
            .collect(Collectors.joining(",")));
    if ("nav-search".equals(htmxRequest.getTriggerId())) {
      //noinspection SpringMVCViewInspection
      return "fragments/contact-list-rows :: rows";
    }
    return "contacts/index";
  }

  @GetMapping("/{slug}")
  public String viewContact(@PathVariable String slug, Model model) {
    model.addAttribute("contact", contactService.findBySlug(slug));
    return "contacts/view";
  }

  @GetMapping("/new")
  public String newContact(Model model) {
    model.addAttribute("contact", new Contact());
    return "contacts/new";
  }

  @GetMapping("/{slug}/edit")
  public String editContact(@PathVariable String slug, Model model) {
    model.addAttribute("contact", contactService.findBySlug(slug));
    return "contacts/edit";
  }

  @PostMapping("/{slug}/edit")
  public String updateContact(
      @PathVariable String slug, @Valid @ModelAttribute Contact contact, BindingResult result) {
    if (result.hasErrors()) {
      return "contacts/edit";
    }
    var updated = contactService.update(slug, contact);
    return "redirect:/contacts/" + updated.getSlug();
  }

  @PostMapping
  public String createContact(@Valid @ModelAttribute Contact contact, BindingResult result) {
    if (result.hasErrors()) {
      return "contacts/new";
    }
    contactService.save(contact);
    return "redirect:/contacts";
  }

  @DeleteMapping("/{slug}")
  public ResponseEntity<Void> deleteContact(@PathVariable String slug) {
    contactService.delete(slug);
    return ResponseEntity.status(HttpStatus.SEE_OTHER).location(URI.create("/contacts")).build();
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteManyContacts(
      @RequestParam(name = "selected_contact_slugs", required = false)
          List<String> selectedContactSlugs) {
    if (selectedContactSlugs != null && !selectedContactSlugs.isEmpty()) {
      contactService.deleteMany(selectedContactSlugs);
    }
    return ResponseEntity.status(HttpStatus.SEE_OTHER).location(URI.create("/contacts")).build();
  }

  @GetMapping("/{slug}/email")
  @ResponseBody
  public String validateEmail(@PathVariable String slug, @RequestParam String email) {
    var violations = validator.validateValue(Contact.class, "email", email);
    if (!violations.isEmpty()) {
      return "<span class=\"error\">" + violations.iterator().next().getMessage() + "</span>";
    }
    if (contactService.isEmailTaken(email, slug)) {
      return "<span class=\"error\">Email already taken</span>";
    }
    return "";
  }

  @ExceptionHandler(ContactNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public String handleNotFound(ContactNotFoundException ex, Model model) {
    model.addAttribute("message", ex.getMessage());
    return "error/404";
  }
}
