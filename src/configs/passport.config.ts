import { Container } from 'typedi';
import { AccountService } from './../services/account.service';
import passport from "passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { AppDataSource } from "./data-source";
import { Account } from "../entites/account.entity";

const accountRepository = AppDataSource.getRepository(Account)
const accountService: AccountService = Container.get(AccountService);
const LocalStrategyOption = {
    usernameField: "username",
    passwordField: "password"
};
async function localVerify(username:string, password: string, done: any) {

    try {
        const user = await accountService.comparePassword({username, password});
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (e) {
        return done(e);
    }
}

const jwtStrategyOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt-secret-key',
};

async function jwtVerift(payload: any, done: any) {
    try {
        const user = await accountRepository.findOneBy({username: payload.username});
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (e) {
        return done(e);
    }
}

function passportConfig() {
    passport.use(new LocalStrategy(LocalStrategyOption, localVerify));
    passport.use(new JWTStrategy(jwtStrategyOption, jwtVerift));
}

export {
    passportConfig
}