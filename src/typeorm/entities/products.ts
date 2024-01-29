import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Suppliers } from "./suppliers";

@Entity({ name: "products" })
export class Products {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @Column({ name: "name", type: "text", nullable: false })
  name: string

  @Column({ name: "qt_per_unit", type: "varchar", nullable: false })
  quantityPerUnit: string

  @Column({ name: "unit_price", type: "double precision", nullable: false })
  unitPrice: number

  @Column({ name: "units_in_stock", type: "integer", nullable: false })
  unitsInStock: number

  @Column({ name: "units_on_order", type: "integer", nullable: false })
  unitsOnOrder: number

  @Column({ name: "reorder_level", type: "integer", nullable: false })
  reorderLevel: number

  @Column({ name: "discontinued", type: "boolean", nullable: false })
  discontinued: boolean

  @Index()
  @Column({ name: "supplier_id", type: "integer", nullable: false })
  supplierId: number
  @ManyToOne<Suppliers>(() => Suppliers, (supplier) => supplier.id, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "supplier_id" })
  supplier: Suppliers
}

