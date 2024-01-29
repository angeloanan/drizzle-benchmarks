import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";
import { Orders } from "./orders";
import { Products } from "./products";

@Entity({ name: "order_details" })
export class OrderDetails {
  @Column({ name: "unit_price", type: "double precision", nullable: false })
  unitPrice: number

  @Column({ name: "quantity", type: "integer", nullable: false })
  quantity: number

  @Column({ name: "discount", type: "double precision", nullable: false })
  discount: number

  @Index()
  @Column({ name: "order_id", type: "integer", nullable: false })
  orderId: number
  @OneToOne<Orders>(() => Orders, (orders) => orders.id, { nullable: false, onDelete: "CASCADE" })
  order: Orders

  @Index()
  @Column({ name: "product_id", type: "integer", nullable: false })
  productId: number
  @OneToMany<Products>(() => Products, (products) => products.id, { nullable: false, onDelete: "CASCADE" })
  product: Orders
}

