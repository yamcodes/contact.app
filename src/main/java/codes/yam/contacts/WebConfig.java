package codes.yam.contacts;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.UrlHandlerFilter;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addRedirectViewController("/", "/contacts");
  }

  @Bean
  public FilterRegistrationBean<UrlHandlerFilter> trailingSlashFilter() {
    UrlHandlerFilter filter = UrlHandlerFilter
        .trailingSlashHandler("/**")
        .redirect(HttpStatus.PERMANENT_REDIRECT)
        .build();
    return new FilterRegistrationBean<>(filter);
  }
}
