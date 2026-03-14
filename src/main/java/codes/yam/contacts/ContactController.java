package codes.yam.contacts;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
public class ContactController {
  private final ContactService contactService;

  @GetMapping("/")
  public String index() {
    return "redirect:/contacts";
  }

  @GetMapping("/contacts")
  public String contacts(@RequestParam(required = false) String q, Model model) {
    var contacts =
        (q != null && !q.isBlank()) ? contactService.search(q) : contactService.findAll();
    model.addAttribute("contacts", contacts);
    model.addAttribute("search", q);
    return "contacts/list";
  }

  @GetMapping("/contacts/{slug}")
  public String viewContact(@PathVariable String slug, Model model) {
    model.addAttribute("contact", contactService.findBySlug(slug));
    return "contacts/view";
  }

  @GetMapping("/contacts/new")
  public String newContact(Model model) {
    model.addAttribute("contact", new Contact());
    return "contacts/new";
  }

  @GetMapping("/contacts/{slug}/edit")
  public String editContact(@PathVariable String slug, Model model) {
    model.addAttribute("contact", contactService.findBySlug(slug));
    return "contacts/edit";
  }

  @PostMapping("/contacts/{slug}/edit")
  public String updateContact(
      @PathVariable String slug,
      @Valid @ModelAttribute Contact contact,
      BindingResult result,
      RedirectAttributes redirectAttributes) {
    if (result.hasErrors()) {
      return "contacts/edit";
    }
    var updated = contactService.update(slug, contact);
    redirectAttributes.addFlashAttribute("flash", "Contact updated successfully.");
    return "redirect:/contacts/" + updated.getSlug();
  }

  @PostMapping("/contacts")
  public String createContact(
      @Valid @ModelAttribute Contact contact,
      BindingResult result,
      RedirectAttributes redirectAttributes) {
    if (result.hasErrors()) {
      return "contacts/new";
    }
    contactService.save(contact);
    redirectAttributes.addFlashAttribute("flash", "Contact created successfully.");
    return "redirect:/contacts";
  }

  @PostMapping("/contacts/{slug}/delete")
  public String deleteContact(@PathVariable String slug, RedirectAttributes redirectAttributes) {
    contactService.delete(slug);
    redirectAttributes.addFlashAttribute("flash", "Contact deleted.");
    return "redirect:/contacts";
  }

  @ExceptionHandler(ContactNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public String handleNotFound(ContactNotFoundException ex, Model model) {
    model.addAttribute("message", ex.getMessage());
    return "error/404";
  }
}
