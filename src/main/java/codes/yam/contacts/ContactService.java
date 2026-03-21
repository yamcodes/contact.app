package codes.yam.contacts;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {
  private final ContactRepository contactRepository;

  public Page<Contact> list(String q, Pageable pageable) {
    if (q != null && !q.isBlank()) {
      return contactRepository.search(q, pageable);
    }
    return contactRepository.findAll(pageable);
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

  public long count() {
    return contactRepository.count();
  }

  private String generateSlug(Contact contact) {
    return (contact.getFirst().toLowerCase() + "-" + contact.getLast().toLowerCase())
        .replaceAll("[^a-z0-9-]", "");
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
