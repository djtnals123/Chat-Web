import { AccountService } from './../services/account.service';
import { FriendService } from './../services/friend.service';
import { Service } from "typedi";
import express from 'express';

@Service()
export class FriendController {
    private readonly RENDER_PATH = 'friend/';
    constructor(
        private readonly service: FriendService, 
        private readonly accountService: AccountService
        ){}

    async list(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const friends = await this.service.getFriendList(user.id);
        res.render(`${this.RENDER_PATH}friend_list`, {user, friends});
    }

    async request(req: express.Request, res: express.Response) {
        const user: any = req.user
        await this.service.friendRequest(user.id, req.body.userId);
        return res.json({message: 'success'});
    }

    async accept(req: express.Request, res: express.Response) {
        const user: any = req.user;
        await this.service.accept(req.body.userId, user.id);
        res.redirect('/friend/inbox');
    }

    async refus(req: express.Request, res: express.Response) {
        const user: any = req.user;
        await this.service.refus(req.body.userId, user.id);
        res.redirect('/friend/inbox');
    }

    async delete(req: express.Request, res: express.Response) {
        const user: any = req.user;
        await this.service.delete(user.id, req.body.userId);
        res.redirect('/friend');
    }

    async inbox(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const inbox = await this.service.inbox(user.id);
        res.render(`${this.RENDER_PATH}friend_inbox`, {inbox, user});
    }

    async dm(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const friendId: number = parseInt(req.params.friendId);
        const friend = await this.accountService.getUserById(friendId);
        res.render(`${this.RENDER_PATH}friend_dm`, {friend, user});
    }
}