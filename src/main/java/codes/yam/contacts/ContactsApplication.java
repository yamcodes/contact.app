package codes.yam.contacts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ContactsApplication {

  static void main(String[] args) {
    ApplicationContext ctx = SpringApplication.run(ContactsApplication.class, args);
    String port = ctx.getEnvironment().getProperty("local.server.port");
    System.out.println("Server is listening on http://localhost:" + port);
  }
}
