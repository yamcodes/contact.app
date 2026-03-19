# Contacts

[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/yamcodes/contact.app)

![Cover](assets/cover.png)

A contact management app built with Spring Boot, Thymeleaf, and htmx.

## Overview

This app follows the architecture from [Hypermedia Systems](https://hypermedia.systems/part/htmx/) - same ideas, different tech stack (Spring Boot + Thymeleaf instead of Python and Flask).

- HTML is rendered on the server with Thymeleaf templates
- htmx handles partial page updates via AJAX via [`htmx-spring-boot-thymeleaf`](https://github.com/wimdeblauwe/htmx-spring-boot)
- No full page reloads for most interactions
- No client-side JavaScript framework (just htmx attributes)

## Features

- List and search contacts (with instant filtering via htmx)
- Add, edit, and delete contact details
- Server-rendered HTML with Thymeleaf
- Partial page updates (no full reloads)
- H2 in-memory database with Spring Data JPA

## Development

### Quickstart

```bash
# Start dev server
./mvnw spring-boot:run

# Open in browser
open http://localhost:8080
```

### VS Code

1. **Install extensions** - open the Extensions panel, search `@recommended`, and install all workspace recommendations (Java Extension Pack, Spring Boot Extension Pack, Lombok, htmx attributes)
2. **Java 25 SDK** - VS Code will prompt to download a JDK if none is found; select Java 25 (if you have multiple JDKs, point `java.jdt.ls.java.home` in user settings to your Java 25 installation)
3. **Run** - use the **Run** task via `Ctrl+Shift+P → Tasks: Run Task → Run`, or press `Ctrl+Shift+P → Spring Boot Dashboard: Run` from the Spring Boot extension

**Tips:**
- Spring Boot DevTools (already included) enables hot reload - save a file and changes apply automatically
- Thymeleaf templates hot-reload without a restart
- H2 console is available at `http://localhost:8080/h2-console`

### IntelliJ IDEA

1. **Open** - **File → Open**, select `pom.xml`, choose **"Open as Project"**
2. **Java 25 SDK** - **File → Project Structure → SDKs**, add Java 25 if missing (IntelliJ can download it)
3. **Lombok** - install the [Lombok plugin](https://plugins.jetbrains.com/plugin/6317-lombok) via **Settings → Plugins**, then enable annotation processing under **Settings → Build, Execution, Deployment → Compiler → Annotation Processors**
4. **Run** - use the included **Contacts** run configuration (`.run/Contacts.run.xml`) from the toolbar, or run `spring-boot:run` from the Maven tool window

**Tips:**
- Spring Boot DevTools (already included) enables hot reload - recompile with `Ctrl+F9` without restarting
- Enable **"Build project automatically"** in settings for seamless reloads on save
- Thymeleaf templates hot-reload without a restart
- H2 console is available at `http://localhost:8080/h2-console`

### Scripts

| Command                  | Description      |
|--------------------------|------------------|
| `./mvnw spring-boot:run` | Start dev server |
| `./mvnw test`            | Run tests        |
| `./mvnw package`         | Build jar        |

## Project structure

```
src/
├── main/
│   ├── java/codes/yam/contacts/
│   │   ├── ContactsApplication.java     # Entry point
│   │   ├── ContactController.java       # All /contacts routes
│   │   ├── Contact.java                 # JPA entity (id, slug, first, last, email, phone)
│   │   ├── ContactRepository.java       # Spring Data JPA (search, pagination)
│   │   └── ContactService.java          # Validation, slug generation, business logic
│   └── resources/
│       ├── templates/
│       │   ├── layout.html              # Base layout (Thymeleaf fragment)
│       │   ├── contacts/
│       │   │   ├── list.html            # GET /contacts
│       │   │   ├── view.html            # GET /contacts/{slug}
│       │   │   ├── new.html             # GET /contacts/new
│       │   │   └── edit.html            # GET /contacts/{slug}/edit
│       │   ├── error/
│       │   │   └── 404.html             # 404 not found page
│       │   └── fragments/
│       │       ├── contact-fields.html  # Reusable form fields (htmx partial)
│       │       └── contact-rows.html    # Table rows (htmx partial for search/pagination)
│       ├── static/
│       │   ├── styles.css
│       │   └── img/
│       │       └── spinning-circles.svg # Loading spinner
│       └── application.yaml
└── test/
    └── java/codes/yam/contacts/
        ├── controller/
        │   └── ContactControllerTest.java
        └── service/
            └── ContactServiceTest.java
```

### Routes

| Method   | Path                     | Description                         |
|----------|--------------------------|-------------------------------------|
| `GET`    | `/`                      | Redirect to `/contacts`             |
| `GET`    | `/contacts`              | List contacts (search + pagination) |
| `GET`    | `/contacts/new`          | New contact form                    |
| `POST`   | `/contacts`              | Create contact                      |
| `GET`    | `/contacts/{slug}`       | View contact                        |
| `GET`    | `/contacts/{slug}/edit`  | Edit contact form                   |
| `POST`   | `/contacts/{slug}/edit`  | Update contact                      |
| `DELETE` | `/contacts/{slug}`       | Delete contact                      |
| `DELETE` | `/contacts`              | Bulk delete contacts                |
| `GET`    | `/contacts/{slug}/email` | Inline email validation (htmx)      |
| `GET`    | `/contacts/count`        | Async contact count (htmx)          |

## Tech stack

| Layer      | Technology                                                                                               |
|------------|----------------------------------------------------------------------------------------------------------|
| Language   | Java 25                                                                                                  |
| Framework  | [Spring Boot](https://spring.io/projects/spring-boot) 4.0.3                                              |
| Templating | [Thymeleaf](https://www.thymeleaf.org)                                                                   |
| Hypermedia | [htmx](https://htmx.org) + [htmx-spring-boot-thymeleaf](https://github.com/wimdeblauwe/htmx-spring-boot) |
| Database   | H2 (in-memory) + Spring Data JPA                                                                         |
| Build      | Maven                                                                                                    |

## Branches

This repo tracks the evolution of the app across different stacks - earlier branches used [Hono](https://hono.dev/) (a TypeScript web framework), while `main` is the current Spring Boot implementation.

| Branch                                                                             | Summary                       | Description                                                                                            |
|------------------------------------------------------------------------------------|-------------------------------|--------------------------------------------------------------------------------------------------------|
| [`hono-web1`](https://github.com/yamcodes/contact.app/tree/hono-web1)              | Hypermedia-Driven Application | Server-rendered HTML using links and forms. Full page reloads. Pure hypermedia, no client-side JS.     |
| [`hono`](https://github.com/yamcodes/contact.app/tree/hono)                        | HDA + HTMX                    | Same architecture as `hono-web1`, enhanced with HTMX for partial updates without JSON or client-side state. |
| [`hono-eta`](https://github.com/yamcodes/contact.app/tree/hono-eta)                | HDA (Eta templates)           | Same architecture as `hono-web1`, using string-based Eta templates instead of JSX.                     |
| **[`main`](https://github.com/yamcodes/contact.app/tree/main)** (You're here!)     | **HDA + Spring Boot**         | **Same architecture, rewritten in Java with Spring Boot, Thymeleaf, and htmx-spring-boot.**            |

## License

MIT
