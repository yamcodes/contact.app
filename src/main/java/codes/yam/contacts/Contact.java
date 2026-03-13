package codes.yam.contacts;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.UUID;
import lombok.Data;

@Data
@Entity
public class Contact {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String slug;
  private String first;
  private String last;
  private String email;
  private String phone;
}
