import { AccountService } from '../services/account.service';
import { Service } from "typedi";
import express from 'express';
import { Account } from "../entites/account.entity";

@Service()
export class AccountController {
    private readonly RENDER_PATH = 'account/';
    constructor(private readonly accountService: AccountService){}

    async list(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const userList: Account[] = await this.accountService.getUserList(user.id);
        res.render(`${this.RENDER_PATH}user_list`, {userList, user});
    }
}