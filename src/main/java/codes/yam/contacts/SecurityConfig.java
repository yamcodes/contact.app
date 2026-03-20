package codes.yam.contacts;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) {
    return http
        .authorizeHttpRequests(
            auth -> auth.requestMatchers("/h2-console/**").permitAll().anyRequest().authenticated())
        .formLogin(Customizer.withDefaults())
        .headers(
            headers ->
                headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
        .csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**"))
        .build();
  }
}
