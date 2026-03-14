package codes.yam.contacts;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {
  private final ContactRepository contactRepository;

  public List<Contact> findAll() {
    return contactRepository.findAll();
  }

  public Contact findBySlug(String slug) {
    return contactRepository.findBySlug(slug);
  }

  public void save(Contact contact) {
    contact.setSlug(contact.getFirst().toLowerCase() + "-" + contact.getLast().toLowerCase());
    contactRepository.save(contact);
  }

  public Contact update(String slug, Contact updated) {
    var contact = contactRepository.findBySlug(slug);
    if (contact == null) throw new ContactNotFoundException();
    contact.setFirst(updated.getFirst());
    contact.setLast(updated.getLast());
    contact.setEmail(updated.getEmail());
    contact.setPhone(updated.getPhone());
    contact.setSlug(updated.getFirst().toLowerCase() + "-" + updated.getLast().toLowerCase());
    return contactRepository.save(contact);
  }
}
