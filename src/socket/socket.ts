import Container, { Inject } from "typedi";
import { DmService } from "../services/dm.service";

let room = ['room1', 'room2'];
let roomToUsers: any = {}
const dmService: DmService = Container.get(DmService);

function initSocket() {
    const io: any = Container.get('io');
    io.on('connection', (socket: any) => {
        socket.on('disconnect', async () => {
            await socket.leave(room[socket.room]);
            io.to(room[socket.room]).emit('leaveRoom', socket.room, socket.username);
            
            if(roomToUsers[socket.room]) {
                const i = roomToUsers[socket.room].indexOf(socket.username);
                roomToUsers[socket.room].splice(i, 1);
            }
            console.log('user disconnected');
        });
    
        socket.on('leaveRoom', async (num: number, name: string) => {
            // await socket.leave(room[num]);
            // console.log(name + ' leave a ' + room[num]);
            // io.to(room[num]).emit('leaveRoom', num, name);
        });
      
      
        socket.on('joinRoom', async (num: number, name: string) => {
            socket.username = name;
            socket.room = num;
            let userList = roomToUsers[num];
            if(!userList) 
                roomToUsers[num] = [];
            roomToUsers[num].push(name);
            await socket.join(room[num]);
            console.log(typeof(name));
            console.log(name + ' join a ' + room[num]);
            socket.emit('initUserList', roomToUsers[num]);
            io.to(room[num]).emit('joinRoom', num, name);
        });
      
      
        socket.on('chat message', (msg: string) => {
            io.to(room[socket.room]).emit('chat message', socket.username, msg);
        });
    
        // socket.on('leaveDM', async (me, opponent) => { 
        //     const temp = [me, opponent].sort();
        //     const key = temp[0] + '|' + temp[1];
        //     await socket.leave(key);
        //     console.log(me + ' leave a ' + key);
        // });
      
      
        socket.on('joinDM', async (me: number, opponent: number) => {
            const temp = [me, opponent].sort();
            const key = temp[0] + '|' + temp[1];
            await socket.join(key);
            const dmList = await dmService.getDmList(me, opponent);
            socket.emit('init DM', dmList);
            console.log(me + ' join a ' + key);
        });
      
      
        socket.on('chat DM', (me: number, opponent: number, msg: string, username: string) => {
            const temp = [me, opponent].sort();
            const key = temp[0] + '|' + temp[1];
            dmService.saveDM(me, opponent, msg);
            io.to(key).emit('chat DM', username, msg);
        });
    });
}

export {
    initSocket
}