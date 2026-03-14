package codes.yam.contacts;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
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
  public String contacts(@RequestParam(required = false) String q, Model model) {
    var contacts =
        (q != null && !q.isBlank()) ? contactService.search(q) : contactService.findAll();
    model.addAttribute("contacts", contacts);
    model.addAttribute("search", q);
    return "contacts/list";
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
    // TODO: extract seeOther helper if this pattern repeats
    return ResponseEntity.status(HttpStatus.SEE_OTHER).location(URI.create("/contacts")).build();
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteManyContacts(
      @RequestParam(required = false) List<String> selected_contact_slugs) {
    if (selected_contact_slugs == null || selected_contact_slugs.isEmpty()) {
      return ResponseEntity.noContent().build();
    }
    contactService.deleteMany(selected_contact_slugs);
    return ResponseEntity.status(HttpStatus.SEE_OTHER).location(URI.create("/contacts")).build();
  }

  @GetMapping("/{slug}/email")
  @ResponseBody
  public String validateEmail(@PathVariable String slug, @RequestParam String email) {
    var violations = validator.validateValue(Contact.class, "email", email);
    if (!violations.isEmpty()) {
      return violations.iterator().next().getMessage();
    }
    if (contactService.isEmailTaken(email, slug)) {
      return "Email already taken";
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
