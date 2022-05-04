import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./account.entity"

@Entity({name: 'friendship'})
export class FriendShip extends BaseEntity{
    @PrimaryGeneratedColumn ()
    id!: number

    @ManyToOne(() => Account, account => account.friends)
    user!: Account

    @ManyToOne(() => Account, account => account.id)
    friend!: Account

    @Column()
    userId!: number

    @Column()
    friendId!: number
}