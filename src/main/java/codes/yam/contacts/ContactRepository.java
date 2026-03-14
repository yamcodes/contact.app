package codes.yam.contacts;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, UUID> {
  Optional<Contact> findBySlug(String slug);

  Optional<Contact> findByEmail(String email);

  List<Contact> findAllBySlugIn(Collection<String> slugs);

  List<Contact>
      findByFirstContainingIgnoreCaseOrLastContainingIgnoreCaseOrEmailContainingIgnoreCase(
          String first, String last, String email);
}
