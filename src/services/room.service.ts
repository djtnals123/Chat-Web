import { Inject, Service } from "typedi";

@Service()
export class RoomService {
    private room = ['room1', 'room2'];

    
    constructor(@Inject('io') private io: any) {}

    getRoomList() {
        const roomList: Array<any> = [];
        for(const i in this.room){
            const r: any = {}
            const count = this.io.sockets.adapter.rooms.get(this.room[i])?.size;
            r.count = count ? count : 0;
            r.name = this.room[i];
            r.number = parseInt(i)+1;
            roomList.push(r);
        }

        return roomList;
    }

    getRoom(roomId: string){
        const id: number = parseInt(roomId);
        const room: any = {}
        const count = this.io.sockets.adapter.rooms.get(room[id-1])?.size;
        room.count = count ? count : 0;
        room.name = room[id-1];
        room.number = id;

        return room;
    }
}
