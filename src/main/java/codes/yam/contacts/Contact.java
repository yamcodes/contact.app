package codes.yam.contacts;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.UUID;
import lombok.Data;

@Data
@Entity
public class Contact {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String slug;

  @NotBlank
  private String first;

  @NotBlank
  private String last;

  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String phone;
}
