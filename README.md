# Contacts

A simple contacts app built with Spring Boot and Thymeleaf.

## Branches

| Branch | Summary | Description |
|--------|---------|-------------|
| [`main`](https://github.com/yamcodes/contact.app/tree/main) | Hypermedia-Driven Application | Server-rendered HTML using links and forms. Full page reloads. Pure hypermedia, no client-side JS. |
| [`htmx`](https://github.com/yamcodes/contact.app/tree/htmx) | HDA + HTMX | Same architecture as `main`, enhanced with HTMX for partial updates without JSON or client-side state. |
| [`eta`](https://github.com/yamcodes/contact.app/tree/eta) | HDA (Eta templates) | Same architecture as `main`, using string-based Eta templates instead of JSX. |
| **[`spring`](https://github.com/yamcodes/contact.app/tree/spring)** (You're here!) | **HDA + Spring Boot** | **Same architecture, rewritten in Java with Spring Boot, Thymeleaf, and htmx-spring-boot.** |

There are also temporary feature branches but these are the stable branches.

## Overview

This app follows the architecture from [Hypermedia Systems](https://hypermedia.systems/part/htmx/) — same ideas, different tech stack (Spring Boot + Thymeleaf instead of Python + Flask).

This branch (`spring`) uses [Spring Boot](https://spring.io/projects/spring-boot) with [Thymeleaf](https://www.thymeleaf.org) and [htmx](https://htmx.org):
- HTML is rendered on the server with Thymeleaf templates
- htmx handles partial page updates via AJAX
- No full page reloads for most interactions
- No client-side JavaScript framework (just htmx attributes)

> The `htmx-spring-boot-thymeleaf` library integrates htmx into Spring MVC controllers via `HtmxRequest`, `HtmxResponse`, and Thymeleaf dialect support.

## Features

- List and search contacts (with instant filtering via htmx)
- Add, edit, and delete contact details
- Server-rendered HTML with Thymeleaf
- Partial page updates (no full reloads)
- H2 in-memory database with Spring Data JPA

## Quickstart

```bash
# Start dev server
./mvnw spring-boot:run

# Open in browser
open http://localhost:8080
```

## VS Code

1. **Install extensions** — open the Extensions panel, search `@recommended`, and install all workspace recommendations (Java Extension Pack, Spring Boot Extension Pack, Lombok, htmx attributes)
2. **Java 25 SDK** — VS Code will prompt to download a JDK if none is found; select Java 25, or set `java.jdt.ls.java.home` in settings to an existing Java 25 installation
3. **Run** — use the **Run** task via `Ctrl+Shift+P → Tasks: Run Task → Run`, or press `Ctrl+Shift+P → Spring Boot Dashboard: Run` from the Spring Boot extension

**Tips:**
- Spring Boot DevTools (already included) enables hot reload — save a file and changes apply automatically
- Thymeleaf templates hot-reload without a restart
- H2 console is available at `http://localhost:8080/h2-console`

## IntelliJ IDEA

1. **Open** — **File → Open**, select `pom.xml`, choose **"Open as Project"**
2. **Java 25 SDK** — **File → Project Structure → SDKs**, add Java 25 if missing (IntelliJ can download it)
3. **Lombok** — install the [Lombok plugin](https://plugins.jetbrains.com/plugin/6317-lombok) via **Settings → Plugins**, then enable annotation processing under **Settings → Build, Execution, Deployment → Compiler → Annotation Processors**
4. **Run** — use the included **Contacts** run configuration (`.run/Contacts.run.xml`) from the toolbar, or run `spring-boot:run` from the Maven tool window

**Tips:**
- Spring Boot DevTools (already included) enables hot reload — recompile with `Ctrl+F9` without restarting
- Enable **"Build project automatically"** in settings for seamless reloads on save
- Thymeleaf templates hot-reload without a restart
- H2 console is available at `http://localhost:8080/h2-console`

## Scripts

| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Start dev server |
| `./mvnw test` | Run tests |
| `./mvnw package` | Build jar |

## Project structure

```
src/
├── main/
│   ├── java/codes/yam/contacts/   # Application code
│   └── resources/
│       ├── templates/              # Thymeleaf templates (.html)
│       ├── static/                 # Static assets (CSS, JS)
│       └── application.yaml        # App configuration
└── test/
    └── java/codes/yam/contacts/   # Tests
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Language | Java 25 |
| Framework | [Spring Boot](https://spring.io/projects/spring-boot) 4.0.3 |
| Templating | [Thymeleaf](https://www.thymeleaf.org) |
| Hypermedia | [htmx](https://htmx.org) + [htmx-spring-boot-thymeleaf](https://github.com/wimdeblauwe/htmx-spring-boot) |
| Database | H2 (in-memory) + Spring Data JPA |
| Build | Maven |

## License

MIT
