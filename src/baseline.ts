
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";


const app = new Hono();
app.get("/customers", async (c) => {
  return c.json({});
});

app.get("/customer-by-id", async (c) => {
  return c.json({});
});

app.get("/search-customer", async (c) => {
  return c.json({});
});

app.get("/employees", async (c) => {
  return c.json({});
});

app.get("/employee-with-recipient", async (c) => {
  return c.json({});
});

app.get("/suppliers", async (c) => {
  return c.json({});
});

app.get("/supplier-by-id", async (c) => {
  return c.json({});
});

app.get("/products", async (c) => {
  return c.json({});
});

app.get("/product-with-supplier", async (c) => {
  return c.json({});
});

app.get("/search-product", async (c) => {
  return c.json({});
});

app.get("/orders-with-details", async (c) => {
  return c.json({});
})

app.get("/order-with-details", async (c) => {
  return c.json({});
});

app.get("/order-with-details-and-products", async (c) => {
  return c.json({});
});

serve({
  fetch: app.fetch,
  port: 2999,
});
