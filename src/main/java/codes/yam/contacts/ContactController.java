package codes.yam.contacts;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContactController {
  @GetMapping("/")
  public String index() {
    return "redirect:/contacts";
  }

  @GetMapping("/contacts")
  public String contacts(Model model) {
    model.addAttribute("contacts", List.of());
    return "contacts/list";
  }
}
