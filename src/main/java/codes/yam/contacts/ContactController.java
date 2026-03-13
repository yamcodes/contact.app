package codes.yam.contacts;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

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
}
