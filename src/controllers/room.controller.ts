import { RoomService } from './../services/room.service';
import express from 'express';
import { Service } from 'typedi';

let room = ['room1', 'room2'];
const RENDER_PATH = 'room/';

@Service()
export class RoomController {
    constructor(private readonly service: RoomService){}

    list(req: express.Request, res: express.Response) {
        const roomList = this.service.getRoomList();
        res.render(`${RENDER_PATH}room_list`, {roomList});
    }

    detail(req: express.Request, res: express.Response) {
        const user: any = req.user;
        const room = this.service.getRoom(req.params.id);
        res.render(`${RENDER_PATH}room_detail`, {room, user});
    }
}