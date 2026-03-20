# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Contact Management hypermedia app built with Spring Boot, Thymeleaf, and htmx.

- **Group:** `codes.yam`
- **Artifact:** `contacts`
- **Java:** 25
- **Spring Boot:** 4.0.3

## Stack

| Layer      | Technology                                |
| ---------- | ----------------------------------------- |
| Framework  | Spring Boot (Web MVC)                     |
| Templates  | Thymeleaf                                 |
| Hypermedia | htmx (`htmx-spring-boot-thymeleaf` 5.0.0) |
| Database   | H2 (in-memory) + Spring Data JPA          |
| Utilities  | Lombok                                    |

## Development Commands

```bash
./mvnw spring-boot:run   # Start dev server (http://localhost:8080)
./mvnw test              # Run tests
./mvnw package           # Build jar
```

## Project Structure

```
src/
  main/
    java/codes/yam/contacts/   # Application code
    resources/
      templates/               # Thymeleaf templates (.html)
      static/                  # Static assets (CSS, JS)
      application.yaml         # App configuration
  test/
    java/codes/yam/contacts/   # Tests
```

## htmx Integration

The `htmx-spring-boot-thymeleaf` library provides:

- `HtmxRequest` injectable in controllers to detect htmx requests
- Thymeleaf dialect for htmx attributes (`hx-get`, `hx-post`, etc.)
- `HtmxResponse` for setting response headers (`HX-Redirect`, `HX-Trigger`, etc.)
