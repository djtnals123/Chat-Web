import { Service } from 'typedi';
import { FriendShip } from './../entites/friendship.entity';
import { FriendRequest } from './../entites/friend-request.entity';
import { AppDataSource } from "../configs/data-source";

@Service()
export class FriendService {
    private friendRequestRepository;
    private friendRepository;
    constructor() {
        this.friendRequestRepository = AppDataSource.getRepository(FriendRequest);
        this.friendRepository = AppDataSource.getRepository(FriendShip);
    }

    async friendRequest(senderId: number, receiverId: number) {
        const where = {senderId, receiverId};
        return await this.friendRequestRepository.insert(where);
    }

    async inbox(receiverId: number) {
        return await this.friendRequestRepository.find({relations:['sender', 'sender.friends'], where:{receiverId}});
    }

    async accept(senderId: number, receiverId: number) {
        // const result = await this.friendRequestRepository.delete({senderId, receiverId,});
        const friendRequest = await this.friendRequestRepository.findBy({senderId, receiverId});
        if(friendRequest) {
            const sender = friendRequest[0].senderId;
            const receiver = friendRequest[0].receiverId;
            await this.friendRequestRepository.delete({senderId, receiverId});

            await this.friendRepository.insert({friendId: sender, userId: receiver});
            await this.friendRepository.insert({friendId: receiver, userId: sender});
            return true;
        }
        return false;
    }

    async refus(senderId: number, receiverId: number) {
        const result: any = await this.friendRequestRepository.delete({senderId, receiverId});
        if(result.affected > 0) {
            return true;
        } else {
            return false;
        }
    }

    async delete(userId: number, friendId: number) {
        const result: any = await this.friendRepository.delete({userId, friendId});
        const result2: any = await this.friendRepository.delete({userId: friendId, friendId: userId});
        let affected = 0;
        affected += result.affected;
        affected += result2.affected;

        if(affected == 2) {
            return true;
        } else {
            return false;
        }
    }

    async getFriendList(userId: number) {
        const friends = await this.friendRepository.find({relations:['friend', 'friend.followers'], where: {userId}});
        return friends;
        // const friends: Account[] = [];
        // for (const element of results) {
        //     friends.push(await element.friend);
        // }
        // return friends;
    }

    // async isDuplicateRequest(senderId: number, receiverId: number): Promise<Boolean> {
    //     const friendRequest = await this.friendRequestRepository.findBy({senderId, receiverId});
    //     return !!friendRequest
    // }
}
