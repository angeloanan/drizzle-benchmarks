import { DataSource } from "typeorm";
import { Customers } from "./entities/customers";
import { Employees } from "./entities/employees";
import { Orders } from "./entities/orders";
import { OrderDetails } from "./entities/orderDetails";
import { Products } from "./entities/products";
import { Suppliers } from "./entities/suppliers";

export const typeormDatasource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    Customers,
    Employees,
    Orders,
    Products,
    OrderDetails,
    Suppliers
  ]
})

