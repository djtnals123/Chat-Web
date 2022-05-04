import { AccountService } from './../services/account.service';
import { Service } from "typedi";
import express from 'express';
import { Account } from "../entites/account.entity";

@Service()
export class IndexController {
    constructor(private readonly accountService: AccountService){}

    index(req: express.Request, res: express.Response) {
        res.render('index');
    }

    async users(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const userList: Account[] = await this.accountService.getUserList(user.id);
        res.render('user_list', {userList, user});
    }
}