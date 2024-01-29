import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "customers" })
export class Customers {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @Column({ name: "company_name", type: "text", nullable: false })
  companyName: string
  
  @Column({ name: "contact_name", type: "varchar", nullable: false })
  contactName: string

  @Column({ name: "contact_title", type: "varchar", nullable: false })
  contactTitle: string

  @Column({ name: "address", type: "varchar", nullable: false })
  address: string

  @Column({ name: "city", type: "varchar", nullable: false })
  city: string

  @Column({ name: "postal_code", type: "varchar", nullable: true })
  postalCode?: string

  @Column({ name: "region", type: "varchar", nullable: true })
  region?: string

  @Column({ name: "country", type: "varchar", nullable: false })
  country: string

  @Column({ name: "phone", type: "varchar", nullable: false })
  phone: string

  @Column({ name: "fax", type: "varchar", nullable: true })
  fax?: string
}

