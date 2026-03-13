package codes.yam.contacts;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

  @ExceptionHandler(ContactNotFoundException.class)
  public String handleNotFound(ContactNotFoundException ex, Model model, HttpServletResponse response) {
    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    model.addAttribute("message", ex.getMessage());
    return "error/404";
  }
}
