import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
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

  @OneToOne<Orders>(() => Orders, (orders) => orders.id, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Orders
  @Index()
  @PrimaryColumn({ name: "order_id", type: "integer", nullable: false })
  orderId: number

  @OneToMany<Products>(() => Products, (products) => products.id, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Orders
  @Index()
  @PrimaryColumn({ name: "product_id", type: "integer", nullable: false })
  productId: number
}

