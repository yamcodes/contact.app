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
    return contactRepository.search(q);
  }

  public Contact findBySlug(String slug) {
    return contactRepository.findBySlug(slug).orElseThrow(ContactNotFoundException::new);
  }

  public void save(Contact contact) {
    contact.setSlug(generateSlug(contact));
    contactRepository.save(contact);
  }

  public void delete(String slug) {
    var contact = findBySlug(slug);
    contactRepository.delete(contact);
  }

  public void deleteMany(List<String> slugs) {
    var contacts = contactRepository.findAllBySlugIn(slugs);
    contactRepository.deleteAllInBatch(contacts);
  }

  public Contact update(String slug, Contact updated) {
    var contact = findBySlug(slug);
    contact.setFirst(updated.getFirst());
    contact.setLast(updated.getLast());
    contact.setEmail(updated.getEmail());
    contact.setPhone(updated.getPhone());
    contact.setSlug(generateSlug(updated));
    return contactRepository.save(contact);
  }

  // TODO: This is fragile - throws NullPointException if first or last is null.
  private String generateSlug(Contact contact) {
    return contact.getFirst().toLowerCase() + "-" + contact.getLast().toLowerCase();
  }

  /**
   * Check if an email exists (for other slugs than the supplied slug).
   *
   * @param email - the email to check
   * @param excludeSlug - the slug to exclude from the check
   * @return true or false
   */
  public boolean isEmailTaken(String email, String excludeSlug) {
    return contactRepository
        .findByEmail(email)
        .map(contact -> !contact.getSlug().equals(excludeSlug))
        .orElse(false);
  }
}
