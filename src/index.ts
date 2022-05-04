import { Container } from 'typedi';
import express from 'express';
import path from 'path';
import passport from 'passport';
import { passportConfig } from './configs/passport.config';
import * as routes from './routes/routes';
import { createServer } from "http";
import { Server } from "socket.io";
import { initSocket } from './socket/socket';

class App {
    private app: express.Application;
    private httpServer;

    constructor() {
        this.app = express();
        this.httpServer = createServer();
        const io: any = new Server(this.httpServer, {});

        Container.set('app', this.app);
        Container.set('io', io);
    }

    start() {
        this.app.set('/views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(express.static(path.join(__dirname, '../static')));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(passport.initialize());

        passportConfig();
        routes.init();
        initSocket();
        
        this.app.listen(8088, () => {
            console.log('Started server with 8088');
        });​
        this.httpServer.listen(3000, () => {
            console.log('Started Http server with 3000');
        });
    }
}

const app = new App();
app.start();


