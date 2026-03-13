package codes.yam.contacts;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequiredArgsConstructor
public class ContactController {
  private final ContactRepository contactRepository;

  @GetMapping("/")
  public String index() {
    return "redirect:/contacts";
  }

  @GetMapping("/contacts")
  public String contacts(Model model) {
    model.addAttribute("contacts", contactRepository.findAll());
    return "contacts/list";
  }

  @GetMapping("/contacts/{slug}")
  public String viewContact(@PathVariable String slug, Model model) {
    var contact = contactRepository.findBySlug(slug);
    if (contact == null) throw new ContactNotFoundException();
    model.addAttribute("contact", contact);
    return "contacts/view";
  }

  @GetMapping("/contacts/new")
  public String newContact(Model model) {
    model.addAttribute("contact", new Contact());
    return "contacts/new";
  }

  @PostMapping("/contacts")
  public String createContact(
      @Valid @ModelAttribute Contact contact,
      BindingResult result,
      RedirectAttributes redirectAttributes) {
    if (result.hasErrors()) {
      return "contacts/new";
    }
    contact.setSlug(contact.getFirst().toLowerCase() + "-" + contact.getLast().toLowerCase());
    contactRepository.save(contact);
    redirectAttributes.addFlashAttribute("flash", "Contact created successfully.");
    return "redirect:/contacts";
  }

  @ExceptionHandler(ContactNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public String handleNotFound(ContactNotFoundException ex, Model model) {
    model.addAttribute("message", ex.getMessage());
    return "error/404";
  }
}
