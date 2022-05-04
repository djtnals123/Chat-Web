import { Service } from "typedi";
import express from 'express';
import { AccountService } from '../services/account.service';
import passport from "passport";
import jsonwebtoken from 'jsonwebtoken';

@Service()
export class AuthController {
    constructor(private readonly service: AccountService){}

    signup(req: express.Request, res: express.Response) {
        this.service.signup(req.body);
        res.json({message:'success', redirect: '/'});
    }

    signin(req: express.Request, res: express.Response, next: any) {
        try {
            passport.authenticate('local', { session: false }, (err, user) => {
                if (err || !user) {
                    console.log(err);
                    return res.status(400).json({success : false, message : "로그인 실패"});
                }
                req.login(user, { session: false }, (err) => {
                    if (err) {
                        console.log(err);
                        return res.send(err);
                    }
                    const token = jsonwebtoken.sign({ username : user.username }, 'jwt-secret-key', {expiresIn: "7d"});
                    // console.log(token);
                    res.cookie('authorization', 'Bearer ' + token, {httpOnly: true});
                    return res.json({ success : true, message : "로그인 성공", token, redirect:'/room'});
                });
            })(req, res);
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }
    
    logout(req: express.Request, res: express.Response) {
        res.clearCookie('authorization');
        res.redirect('/');
    }
        
}