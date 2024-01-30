import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { typeormDatasource } from "./typeorm/datasource";
import { Customers } from "./typeorm/entities/customers";
import { Like } from "typeorm";
import { Employees } from "./typeorm/entities/employees";
import { Suppliers } from "./typeorm/entities/suppliers";
import { Products } from "./typeorm/entities/products";
import { Orders } from "./typeorm/entities/orders";

const datasource = typeormDatasource
const CustomersRepository = datasource.getRepository(Customers)
const EmployeesRepository = datasource.getRepository(Employees)
const SuppliersRepository = datasource.getRepository(Suppliers)
const ProductsRepository = datasource.getRepository(Products)
const OrdersRepository = datasource.getRepository(Orders)

const app = new Hono();
app.get("/customers", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await CustomersRepository.find({
    take: limit,
    skip: offset
  })

  return c.json(result);
});

app.get("/customer-by-id", async (c) => {
  const result = await CustomersRepository.findOne({
    where: {
      id: Number(c.req.query("id")!)
    }
  })

  return c.json(result);
});

app.get("/search-customer", async (c) => {
  const result = await CustomersRepository.find({
    where: {
      companyName: Like(c.req.query("term")! + '%')
    }
  })

  return c.json(result);
});

app.get("/employees", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await EmployeesRepository.find({
    take: limit,
    skip: offset
  })

  return c.json(result);
});

app.get("/employee-with-recipient", async (c) => {
  const result = await EmployeesRepository.find({
    where: {
      id: Number(c.req.query("id"))
    },
    relations: {
      recepient: true
    },
  })

  return c.json([result]);
});

app.get("/suppliers", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await SuppliersRepository.find({
    take: limit,
    skip: offset
  })

  return c.json(result);
});

app.get("/supplier-by-id", async (c) => {
  const result = await SuppliersRepository.findOne({
    where: {
      id: Number(c.req.query("id")!)
    }
  })

  return c.json(result);
});

app.get("/products", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const result = await ProductsRepository.find({
    take: limit,
    skip: offset
  })

  return c.json(result);
});

app.get("/product-with-supplier", async (c) => {
  const result = await ProductsRepository.find({
    where: {
      id: Number(c.req.query("id"))
    },
    relations: {
    supplier: true
    }
  })

  return c.json([result]);
});

app.get("/search-product", async (c) => {
  const result = await ProductsRepository.find({
    where: {
      name: Like(c.req.query("term") + '%')
    }
  })

  return c.json(result);
});

app.get("/orders-with-details", async (c) => {
  const limit = Number(c.req.query("limit"));
  const offset = Number(c.req.query("offset"));

  const res = await OrdersRepository.find({
    take: limit,
    skip: offset,
    relations: {
      
    },
    order: {
      id: "ASC"
    }
  })
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
  const result = await OrdersRepository.find({
    where: {
      id: Number(c.req.query("id"))
    },
    relations: {
      
    }
  })

  const result = await datasource.query("SELECT * FROM orders AS ord RIGHT JOIN order_details AS deets ON ord.id = deets.order_id LEFT JOIN products AS prod ON deets.product_id = prod.id WHERE ord.id = $1", [Number(c.req.query("id")!)])

  return c.json(result);
});

async function run() {
  await datasource.initialize()

  serve({
    fetch: app.fetch,
    port: 3003,
  });
}

run()
