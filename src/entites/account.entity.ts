import { FriendRequest } from './friend-request.entity';
import { FriendShip } from './friendship.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique  } from "typeorm"
import { Follow } from './follow.entity';

@Entity()
@Unique(['username'])
export class Account extends BaseEntity{
    @PrimaryGeneratedColumn ()
    id!: number

    @Column({
        length: 30,
    })
    username!: string

    @Column()
    password!: string
    
    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)" ,
        // transformer: new LocalDateTransformer('datetime')
    })
    createdAt!: number

    @OneToMany(() => FriendShip, (friendShip) => friendShip.user)
    friends!: FriendShip[]

    @OneToMany(() => Follow, (follow) => follow.followee)
    followers!: Follow[]

    @OneToMany(() => Follow, (folloe) => folloe.follower)
    followees!: Follow[]

    @OneToMany(() => FriendRequest, (fr) => fr.receiver)
    receivedFriendRequests!: FriendRequest[]
}