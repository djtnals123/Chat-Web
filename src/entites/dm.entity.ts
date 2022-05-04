import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./account.entity"

@Entity()
export class DM extends BaseEntity{
    @PrimaryGeneratedColumn ()
    id!: number

    @ManyToOne(() => Account, account => account.id)
    receiver!: Account

    @ManyToOne(() => Account, account => account.id, {eager: true})
    sender!: Account

    @Column()
    receiverId!: number

    @Column()
    senderId!: number

    @Column()
    message!: string
}