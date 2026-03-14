package codes.yam.contacts;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, UUID> {
  Contact findBySlug(String slug);

  List<Contact> findByFirstContainingIgnoreCaseOrLastContainingIgnoreCaseOrEmailContainingIgnoreCase(
      String first, String last, String email);
}
