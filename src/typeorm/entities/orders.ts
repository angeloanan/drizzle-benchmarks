import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customers } from "./customers";
import { Employees } from "./employees";

@Entity({ name: "orders" })
export class Orders {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @Column({ name: "order_date", type: "date", nullable: false })
  orderDate: Date

  @Column({ name: "required_date", type: "date", nullable: false })
  requiredDate: Date

  @Column({ name: "shipped_date", type: "date", nullable: true })
  shippedDate?: Date

  @Column({ name: "ship_via", type: "integer", nullable: false })
  shipVia: number

  @Column({ name: "freight", type: "double precision", nullable: false })
  freight: number

  @Column({ name: "ship_name", type: "varchar", nullable: false })
  shipName: string

  @Column({ name: "ship_city", type: "varchar", nullable: false })
  shipCity: string

  @Column({ name: "ship_region", type: "varchar", nullable: true })
  shipRegion?: string

  @Column({ name: "ship_postal_code", type: "varchar", nullable: true })
  shipPostalCode?: string

  @Column({ name: "ship_country", type: "varchar", nullable: false })
  shipCountry: string

  @ManyToOne<Customers>(() => Customers, (customer) => customer.id, { nullable: false, onDelete: "CASCADE" })
  customer: Customers
  @Column({ name: "customer_id", type: "integer", nullable: false })
  customerId: number

  @ManyToOne<Employees>(() => Employees, (employee) => employee.id, { nullable: false, onDelete: "CASCADE" })
  employee: Employees
  @Column({ name: "employee_id", type: "integer", nullable: false })
  employeeId: number
}

