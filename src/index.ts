import { Hono } from 'hono'

const app = new Hono()

// Redirect / to /contacts
app.get('/', (c) => {
  return c.redirect('/contacts')
});

export default app
