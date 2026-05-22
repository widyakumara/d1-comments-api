import { Hono } from "hono";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.get("/api/posts/:slug/comments", async (ctx) => {
  // Do something and return an HTTP response
  // Optionally, do something with c.req.param("slug")
  const params = ctx.req.param();
  return ctx.json(params);
});

app.post("/api/posts/:slug/comments", async (ctx) => {
  // Do something and return an HTTP response
  // Optionally, do something with c.req.param("slug")
  const params = ctx.req.param();
  return ctx.json(params);
});

export default app;
