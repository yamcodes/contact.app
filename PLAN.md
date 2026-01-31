# HTMX Migration Plan

Step-by-step guide from Web 1.0 to full HTMX implementation.

## Prerequisites

- HTMX is loaded via `<script src="/htmx.js">` in layout
- `c.get("htmx")` detects HTMX requests (returns `true` when `HX-Request` header present)

---

## Step 1: First HTMX Interaction

**Goal:** Replace the "Add New Contact" link with a button that loads the form without full page reload.

**File:** `views/index.eta`

```html
<!-- Before -->
<a href="/contacts/new">Add New Contact</a>

<!-- After -->
<button hx-get="/contacts/new" hx-target="main" hx-swap="innerHTML" hx-push-url="true">
  Add New Contact
</button>
```

**Concepts:** `hx-get`, `hx-target`, `hx-swap`, `hx-push-url`

---

## Step 2: Return Partial HTML

**Goal:** When HTMX requests `/contacts/new`, return just the form (no layout).

**File:** `router.ts`

```ts
router.get("/contacts/new", (c) => {
  if (c.get("htmx")) {
    // Return partial (form only, no layout wrapper)
    return c.html(/* render new.eta body only */);
  }
  return c.render("new");
});
```

**Concepts:** Conditional rendering, partial vs full page responses

---

## Step 3: Active Search

**Goal:** Search contacts as you type.

**File:** `views/index.eta`

```html
<input
  type="search"
  name="q"
  hx-get="/contacts"
  hx-trigger="input changed delay:300ms, search"
  hx-target="tbody"
  hx-swap="innerHTML"
>
```

**File:** `router.ts` - Return just `<tr>` rows for HTMX requests.

**Concepts:** `hx-trigger`, debouncing, targeting specific elements

---

## Step 4: Inline Editing

**Goal:** Edit contact inline without navigation.

**File:** `views/index.eta` - Change Edit link:

```html
<button hx-get="/contacts/<%= contact.slug %>/edit" hx-target="closest tr" hx-swap="outerHTML">
  Edit
</button>
```

**File:** Create `views/partials/contact-row-edit.eta` - Editable row form.

**Concepts:** `closest` selector, `outerHTML` swap, inline forms

---

## Step 5: Delete with Confirmation

**Goal:** Delete contact with HTMX, remove row from DOM.

**File:** `views/contact.eta` or inline:

```html
<button
  hx-delete="/contacts/<%= contact.slug %>"
  hx-confirm="Delete this contact?"
  hx-target="closest tr"
  hx-swap="outerHTML swap:1s"
>
  Delete
</button>
```

**File:** `router.ts` - Return empty string on delete for HTMX.

**Concepts:** `hx-delete`, `hx-confirm`, removing elements

---

## Step 6: Form Submission via HTMX

**Goal:** Submit new/edit forms without full reload.

**File:** `views/new.eta`

```html
<form hx-post="/contacts" hx-target="main" hx-swap="innerHTML">
  ...
</form>
```

**File:** `router.ts` - Return partial or use `HX-Redirect` header.

**Concepts:** `hx-post`, response headers (`HX-Redirect`, `HX-Refresh`)

---

## Step 7: (Optional) Migrate to JSX

Once comfortable with HTMX patterns, migrate templates to Hono JSX for type safety and component reuse.

1. Create `middleware/jsx.tsx` with `jsxRenderer`
2. Convert `.eta` files to `.tsx` components
3. Use `html` helper for layout, JSX for fragments

---

## Reference

- [HTMX Documentation](https://htmx.org/docs/)
- [HTMX Examples](https://htmx.org/examples/)
- Fetch docs: `https://htmx.org/llms.txt`
