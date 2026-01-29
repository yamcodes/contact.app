import { Hono } from 'hono'
import { render } from './lib/template'

const app = new Hono()

// Redirect / to /contacts
app.get('/', (c) => {
  return c.redirect('/contacts')
});

// /contacts
app.get("/contacts", (c) => {
  const contacts = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
  ];
  return c.html(render("contacts.eta", { contacts }));
});

export default app
