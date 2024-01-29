
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { DataSource } from "typeorm";
import "dotenv/config";
import { typeormDatasource } from "./typeorm/datasource";

const datasource = typeormDatasource

const app = new Hono();
app.get("/customers", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await datasource.query("SELECT * FROM customers LIMIT $1 OFFSET $2", [limit, offset])

  return c.json(result);
});

app.get("/customer-by-id", async (c) => {
  const result = await datasource.query("SELECT * FROM customers WHERE id = $1 LIMIT 1", [Number(c.req.query("id")!)])

  return c.json(result);
});

app.get("/search-customer", async (c) => {
  const result = await datasource.query("SELECT * FROM customers WHERE company_name LIKE $1", [`${c.req.query("term")}%`])

  return c.json(result);
});

app.get("/employees", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await datasource.query("SELECT * FROM employees LIMIT $1 OFFSET $2", [limit, offset])

  return c.json(result);
});

app.get("/employee-with-recipient", async (c) => {
  const result = await datasource.query("SELECT * FROM employees AS emp LEFT JOIN employees AS recip ON emp.recipient_id = recip.id WHERE emp.id = $1 LIMIT 1;", [Number(c.req.query("id")!)])

  return c.json([result]);
});

app.get("/suppliers", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await datasource.query("SELECT * FROM suppliers LIMIT $1 OFFSET $2", [limit, offset])

  return c.json(result);
});

app.get("/supplier-by-id", async (c) => {
  const result = await datasource.query("SELECT * FROM suppliers WHERE id = $1 LIMIT 1", [Number(c.req.query("id")!)])

  return c.json(result);
});

app.get("/products", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await datasource.query("SELECT * FROM products LIMIT $1 OFFSET $2", [limit, offset])

  return c.json(result);
});

app.get("/product-with-supplier", async (c) => {
  const result = await datasource.query("SELECT * FROM products AS prod LEFT JOIN suppliers AS supp ON prod.supplier_id = supp.id WHERE prod.id = $1 LIMIT 1", [Number(c.req.query("id")!)])
  return c.json([result]);
});

app.get("/search-product", async (c) => {
  const result = await datasource.query("SELECT * FROM products WHERE name LIKE $1", [`${c.req.query("term")}%`])

  return c.json(result);
});

app.get("/orders-with-details", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const res = await datasource.query("SELECT * FROM orders AS ord RIGHT JOIN order_details AS deets ON ord.id = deets.order_id ORDER BY ord.id ASC LIMIT $1 OFFSET $2", [limit, offset])

  const result = res.map((item) => {
    return {
      id: item.id,
      shippedDate: item.shippedDate,
      shipName: item.shipName,
      shipCity: item.shipCity,
      shipCountry: item.shipCountry,
      productsCount: item.details.length,
      quantitySum: item.details.reduce(
        (sum, deteil) => (sum += +deteil.quantity),
        0
      ),
      totalPrice: item.details.reduce(
        (sum, deteil) => (sum += +deteil.quantity * +deteil.unitPrice),
        0
      ),
    };
  });
  return c.json(result);
});

app.get("/order-with-details", async (c) => {
  const res = await datasource.query("SELECT * FROM orders AS ord RIGHT JOIN order_details AS deets ON ord.id = deets.order_id WHERE ord.id = $1", [Number(c.req.query("id")!)])

  const result = res.map((item) => {
    return {
      id: item.id,
      shippedDate: item.shippedDate,
      shipName: item.shipName,
      shipCity: item.shipCity,
      shipCountry: item.shipCountry,
      productsCount: item.details.length,
      quantitySum: item.details.reduce(
        (sum, detail) => (sum += detail.quantity),
        0
      ),
      totalPrice: item.details.reduce(
        (sum, detail) => (sum += detail.quantity * detail.unitPrice),
        0
      ),
    };
  });

  return c.json(result);
});

app.get("/order-with-details-and-products", async (c) => {
  const result = await datasource.query("SELECT * FROM orders AS ord RIGHT JOIN order_details AS deets ON ord.id = deets.order_id LEFT JOIN products AS prod ON deets.product_id = prod.id WHERE ord.id = $1", [Number(c.req.query("id")!)])

  return c.json(result);
});

async function run() {
  await datasource.initialize()

  serve({
    fetch: app.fetch,
    port: 3002,
  });
}

run()
