package codes.yam.contacts;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContactRepository extends JpaRepository<Contact, UUID> {
  Optional<Contact> findBySlug(String slug);

  Optional<Contact> findByEmail(String email);

  List<Contact> findAllBySlugIn(Collection<String> slugs);

  @Query(
      "SELECT c FROM Contact c WHERE "
          + "LOWER(c.first) LIKE LOWER(CONCAT('%', :q, '%')) OR "
          + "LOWER(c.last)  LIKE LOWER(CONCAT('%', :q, '%')) OR "
          + "LOWER(c.email) LIKE LOWER(CONCAT('%', :q, '%'))")
  List<Contact> search(@Param("q") String q);
}
