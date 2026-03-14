# Thymeleaf Fragment Approaches: Parameterized vs. Model-Access

## Parameterized Fragment

```html
<!-- fragment -->
<div th:fragment="contact-fields(contact)" th:object="${contact}">
    <input th:value="*{first}" .../>
</div>

<!-- usage -->
<div th:insert="~{fragments/contact-fields :: contact-fields(${contact})}"></div>
```

|                      |                                                          |
|----------------------|----------------------------------------------------------|
| **Explicit**         | Fragment declares its dependencies in the signature      |
| **Portable**         | Works regardless of what's in the model                  |
| **Self-documenting** | You know what it needs just by looking at it             |
| **IDE support**      | Broken — IntelliJ can't resolve types on fragment params |

---

## Model-Access Fragment

```html
<!-- fragment -->
<div th:fragment="contact-fields">
    <input th:value="${contact.first}" .../>
</div>

<!-- usage -->
<div th:insert="~{fragments/contact-fields :: contact-fields}"></div>
```

|                       |                                                           |
|-----------------------|-----------------------------------------------------------|
| **Implicit**          | Fragment depends on `contact` being in the model, declared via `@thymesVar` |
| **Coupled**           | Only works in contexts where the model has `contact`      |
| **Simpler call site** | No arguments to pass                                      |
| **IDE support**       | Works — `@thymesVar` resolves model attributes correctly  |

---

## layout:insert (Dialect-specific)

A third pattern from the Layout Dialect itself. The calling template defines content inline using `layout:fragment`, and the reusable template exposes slots for it. Best for passing **HTML content** (not data) into a component — think modals, cards, panels.

```html
<!-- reusable modal template -->
<section class="modal" layout:fragment="modal(title)">
  <header th:text="${title}"></header>
  <div class="modal-body">
    <div layout:fragment="modal-content">Content goes here</div>
  </div>
</section>

<!-- calling template -->
<div layout:insert="~{modal :: modal(title='Greetings')}">
  <p layout:fragment="modal-content">Hi there!</p>
</div>
```

|  |  |
|---|---|
| **For HTML content** | Caller defines the body, reusable template defines the structure |
| **Not for data** | Doesn't solve passing a Java object to a fragment |
| **Dialect-only** | `layout:insert` is not standard Thymeleaf |

---

## When to use which

| Scenario                                                 | Approach      |
|----------------------------------------------------------|---------------|
| Fragment used in many places with different object names | Parameterized |
| Fragment tightly coupled to one model attribute          | Model-access  |
| IDE squiggles are a dealbreaker                          | Model-access  |

**This app:** model-access — `@thymesVar` serves as the contract, `*{}` keeps the template concise.
