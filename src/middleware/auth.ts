import { Container } from 'typedi';
import { AccountService } from '../services/account.service';
const jwt = require('jsonwebtoken');

const accountService: AccountService = Container.get(AccountService);
async function verifyToken(req: any, res: any, next: any)  {
    try {
        // console.log(req.headers.cookie);
        // console.log(req.headers.authorization);
        const cookie = req.headers.cookie;
        if(cookie){
            const token = cookie.split('authorization=Bearer%20')[1];
            let jwt_secret = 'jwt-secret-key';
            req.decoded = await jwt.verify(token, jwt_secret);
            const username: string = req.decoded.username;
            req.user = await accountService.getUserByUsername(username);
            return next();
        }
    } catch (err: any) {
        console.log(err);
        if (err.name == 'TokenExpiredError') {
            return res.status(419).json({success: false, message : "token 만료"});
        }
    }
    return res.status(401).json({success: false, message : "token이 유효하지 않습니다."});
  }
export {
    verifyToken
}