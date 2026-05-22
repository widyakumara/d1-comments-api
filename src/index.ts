import { Context, Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Bindings }>();
app.use("/api/*", cors());

app.get("/", (c) => {
  return c.text("hello world");
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

const cronHalf = async (env: Env) => {
  const slug = "cron";
  const author = "CronHalf";
  const body = new Date().toUTCString();

  const query =
    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)";

  const { results } = await env.DB_BINDING.prepare(query)
    .bind(author, body, slug)
    .run();

  return results;
};

const cronHour = async (env: Env) => {
  const slug = "cron";
  const author = "cronHour";
  const body = new Date().toUTCString();

  const query =
    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)";

  const { results } = await env.DB_BINDING.prepare(query)
    .bind(author, body, slug)
    .run();

  return results;
};

const cronTwo = async (env: Env) => {
  const slug = "cron";
  const author = "cronTwo";
  const body = new Date().toUTCString();

  const query =
    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)";

  const { results } = await env.DB_BINDING.prepare(query)
    .bind(author, body, slug)
    .run();

  return results;
};

const cronFive = async (env: Env) => {
  const slug = "cron";
  const author = "cronFive";
  const body = new Date().toUTCString();

  const query =
    "INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)";

  const { results } = await env.DB_BINDING.prepare(query)
    .bind(author, body, slug)
    .run();

  return results;
};

const scheduled = async (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext,
) => {
  // tests:
  // http://localhost:8787/__scheduled?cron=*/2+*+*+*+*
  // http://localhost:8787/__scheduled?cron=*/5+*+*+*+*
  // http://localhost:8787/__scheduled?cron=*/30+*+*+*+*
  // http://localhost:8787/__scheduled?cron=0+*+*+*+*

  switch (controller.cron) {
    case "*/2 * * * *":
      ctx.waitUntil(cronTwo(env));
      break;
    case "*/5 * * * *":
      ctx.waitUntil(cronFive(env));
      break;
    case "*/30 * * * *":
      ctx.waitUntil(cronHalf(env));
      break;
    case "0 * * * *":
      ctx.waitUntil(cronHour(env));
      break;
  }
};

export default {
  fetch: app.fetch,
  scheduled,
};
