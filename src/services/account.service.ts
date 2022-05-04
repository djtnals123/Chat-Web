import { Not, Repository } from "typeorm";
import { AppDataSource } from "../configs/data-source";
import { User } from "../dto/user.dto";
import { Account } from "../entites/account.entity";
import bcryptjs from "bcryptjs";
import { Unauthorized } from 'http-errors'
import { Service } from "typedi";

@Service()
export class AccountService {
    private accountRepository: Repository<Account>
    constructor() {
        this.accountRepository = AppDataSource.getRepository(Account)
    }

    async signup(dto: User): Promise<{}> {
        dto.password = await this.getHashedPassword(dto.password);
        await this.accountRepository.insert(dto);
        return {}
    }

    public async getHashedPassword(password: string): Promise<string> {
        const salt = await bcryptjs.genSalt();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        return hashedPassword;
    }

    public async comparePassword(dto: User): Promise<Account> {
        const account = await this.accountRepository.findOneBy({username: dto.username});
        if(!account){
            throw new Unauthorized('유효하지 않는 아이디입니다.');
        }
        const isValid: boolean = bcryptjs.compareSync(dto.password, account.password);
        if(!isValid){
            throw new Unauthorized('비밀번호가 일치하지 않습니다.');
        }
        return account;
    }

    public async getUserList(id: number): Promise<Account[]> {
        const userList: Account[] = await this.accountRepository.find({
                relations:['followers', 'friends', 'receivedFriendRequests'],
                where: { id: Not(id) }
            });
        return userList;
    }

    public async getUserByUsername(username: string): Promise<Account> {
        const account: any = await this.accountRepository.findOneBy({username});
        return account;
    } 

    public async getUserById(id: number): Promise<Account> {
        const account: any = await this.accountRepository.findOneBy({id});
        return account;
    } 

    // private divisionArray(array: any[], n: number) {
    //     const dividedArray = []
    //     while(array.length != 0) 
    //         dividedArray.push(array.splice(0, n));
    //     return dividedArray;
    // }
}