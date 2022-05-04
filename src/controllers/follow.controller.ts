import { FollowService } from './../services/follow.service';
import { Service } from "typedi";
import express from 'express';
import { DeleteResult, InsertResult } from 'typeorm';

@Service()
export class FollowController {
    private readonly RENDER_PATH = 'follow/';
    constructor(private readonly service: FollowService){}

    async followerList(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const followers = await this.service.getFollowerList(user.id);
        res.render(`${this.RENDER_PATH}follower_list`, {followers, user});
    }

    async followeeList(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const followees = await this.service.getFolloweeList(user.id);
    
        res.render(`${this.RENDER_PATH}followee_list`, {followees, user});
    }

    async follow(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const followeeId: number = parseInt(req.body.followeeId);
        const result: InsertResult = await this.service.follow(user.id, followeeId);
        return res.json({message: 'success'});
    }

    async unfollow(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const followeeId: number = parseInt(req.params.followeeId);
        const result: DeleteResult = await this.service.unfollow(user.id, followeeId);
        if(result.affected! > 0) 
            return res.json({message: 'success'});
    }
        
}