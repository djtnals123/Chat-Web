import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Account } from "./account.entity"

@Entity()
@Unique(['receiverId', 'senderId'])
export class FriendRequest extends BaseEntity{
    @PrimaryGeneratedColumn ()
    id!: number

    @ManyToOne(() => Account, account => account.id, {eager: true})
    receiver!: Account

    @ManyToOne(() => Account, account => account.id, {eager: true})
    sender!: Account

    @Column()
    receiverId!: number

    @Column()
    senderId!: number
}