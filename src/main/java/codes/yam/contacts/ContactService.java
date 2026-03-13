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
}
