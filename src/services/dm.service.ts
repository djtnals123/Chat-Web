import { DM } from './../entites/dm.entity';
import { AppDataSource } from "../configs/data-source";
import { Repository } from 'typeorm';
import { Service } from 'typedi';

@Service()
export class DmService {
    private dmRepository: Repository<DM>
    constructor() {
        this.dmRepository = AppDataSource.getRepository(DM)
    }

    async saveDM(senderId: number, receiverId: number, message: string): Promise<void>{
        await this.dmRepository.insert({senderId, receiverId, message});
    }

    async getDmList(me: number, opponent: number): Promise<DM[]>{
        const dmList = await this.dmRepository.find({
            where: [
                {
                    senderId: me,
                    receiverId: opponent
                },
                {
                    senderId: opponent,
                    receiverId: me
                }
            ]
        });
        return dmList;
    }
}