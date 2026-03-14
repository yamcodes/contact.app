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

  public List<Contact> search(String q) {
    return contactRepository
        .findByFirstContainingIgnoreCaseOrLastContainingIgnoreCaseOrEmailContainingIgnoreCase(
            q, q, q);
  }

  public Contact findBySlug(String slug) {
    var contact = contactRepository.findBySlug(slug);
    if (contact == null) throw new ContactNotFoundException();
    return contact;
  }

  public void save(Contact contact) {
    contact.setSlug(generateSlug(contact));
    contactRepository.save(contact);
  }

  public void delete(String slug) {
    var contact = contactRepository.findBySlug(slug);
    if (contact == null) throw new ContactNotFoundException();
    contactRepository.delete(contact);
  }

  public void deleteMany(List<String> slugs) {
    var contacts = contactRepository.findAllBySlugIn(slugs);
    contactRepository.deleteAll(contacts);
  }

  public Contact update(String slug, Contact updated) {
    var contact = contactRepository.findBySlug(slug);
    if (contact == null) throw new ContactNotFoundException();
    contact.setFirst(updated.getFirst());
    contact.setLast(updated.getLast());
    contact.setEmail(updated.getEmail());
    contact.setPhone(updated.getPhone());
    contact.setSlug(generateSlug(updated));
    return contactRepository.save(contact);
  }

  private String generateSlug(Contact contact) {
    return contact.getFirst().toLowerCase() + "-" + contact.getLast().toLowerCase();
  }
}
