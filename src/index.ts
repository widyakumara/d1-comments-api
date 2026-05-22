import { Context, Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Bindings }>();
app.use("/api/*", cors());

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.get("/api/posts/:slug/comments", async (ctx: Context) => {
  const query = "SELECT * FROM comments WHERE post_slug = ?";

  const { slug } = ctx.req.param();
  const { results } = await ctx.env.DB_BINDING.prepare(query).bind(slug).run();

  return ctx.json(results);
});

app.post("/api/posts/:slug/comments", async (ctx) => {
  const { slug } = ctx.req.param();
  const { author, body } = await ctx.req.json<CommentType>();

  if (!author) {
    return ctx.json({ code: 400, message: "Missing author" }, 400);
  }

  if (!body) {
    return ctx.json({ code: 400, message: "Missing body" }, 400);
  }

  const query =
    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)";

  const { success } = await ctx.env.DB_BINDING.prepare(query)
    .bind(author, body, slug)
    .run();

  if (success) {
    return ctx.json({ code: 201, message: "Created" }, 201);
  } else {
    return ctx.json({ code: 500, message: "Something went wrong" }, 500);
  }
});

export default app;
