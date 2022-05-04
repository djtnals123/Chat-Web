import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { AppDataSource } from '../configs/data-source';
import { Follow } from '../entites/follow.entity';

@Service()
export class FollowService {
    private followRepository: Repository<Follow>
    constructor() {
        this.followRepository = AppDataSource.getRepository(Follow)
    }

    async follow(followerId: number, followeeId: number) {
        return await this.followRepository.insert({followerId, followeeId});
    }

    async unfollow(followerId: number, followeeId: number) {
        return await this.followRepository.delete({followerId, followeeId});
    }

    async getFolloweeList(followerId: number) {
        const followees = await this.followRepository.find(
            { 
                relations: ['followee', 'followee.friends', 'followee.receivedFriendRequests'], 
                where: { followerId } 
            });
        return followees;
        // const followees: Account[] = [];
        // for (const element of results) {
        //     followees.push(await element.followee);
        // }
        // return followees;
    }

    async getFollowerList(followeeId: number) {
        const followers = await this.followRepository.find(
            { 
                relations: ['follower', 'follower.followers', 'follower.friends', 'follower.receivedFriendRequests'], 
                where: { followeeId } 
            });
        return followers;
        // const followers: Account[] = [];
        // for (const element of results) {
        //     followers.push(await element.follower);
        // }
        // return followers;
    }


}