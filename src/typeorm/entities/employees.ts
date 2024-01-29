import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "employees" })
export class Employees {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number

  @Column({ name: "last_name", type: "varchar", nullable: false })
  lastName: string

  @Column({ name: "first_name", type: "varchar", nullable: true })
  firstName?: string

  @Column({ name: "title", type: "varchar", nullable: false })
  title: string

  @Column({ name: "title_of_courtesy", type: "varchar", nullable: false })
  titleOfCourtesy: string

  @Column({ name: "birth_date", type: "date", nullable: false })
  birthDate: Date

  @Column({ name: "hire_date", type: "date", nullable: false })
  hireDate: Date

  @Column({ name: "address", type: "varchar", nullable: false })
  address: string

  @Column({ name: "city", type: "varchar", nullable: false })
  city: string

  @Column({ name: "postal_code", type: "varchar", nullable: false })
  postalCode: string

  @Column({ name: "country", type: "varchar", nullable: false })
  country: string

  @Column({ name: "home_phone", type: "varchar", nullable: false })
  homePhone: string

  @Column({ name: "extension", type: "integer", nullable: false })
  extension: number

  @Column({ name: "notes", type: "text", nullable: true })
  notes: string

  @OneToOne<Employees>(() => Employees, (employee) => employee.id, { nullable: true })
  @JoinColumn({ name: "recipient_id" })
  recepient?: Employees
  @Index()
  @Column({ name: "recipient_id", type: "integer", nullable: true })
  recepientId?: number
}

