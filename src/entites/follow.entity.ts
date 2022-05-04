
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Account } from "./account.entity"

@Entity()
export class Follow extends BaseEntity{
    @PrimaryGeneratedColumn ()
    id!: number

    @ManyToOne(() => Account, account => account.id)
    follower!: Account

    @ManyToOne(() => Account, account => account.id)
    followee!: Account

    @Column()
    followerId!: number

    @Column()
    followeeId!: number
}