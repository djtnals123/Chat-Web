import { verifyToken } from "../middleware/auth";
import express from 'express';
import { FriendController } from "../controllers/friend.controller";
import Container from "typedi";

const PATH = '/friend';
const controller: FriendController = Container.get(FriendController);
const app: express.Application = Container.get('app');

function init() {
    app.get(PATH, verifyToken, controller.list.bind(controller));
    app.post(PATH + '/request', verifyToken, controller.request.bind(controller));
    app.post(PATH + '/accept', verifyToken, controller.accept.bind(controller));
    app.post(PATH + '/refus', verifyToken, controller.refus.bind(controller));
    app.post(PATH + '/delete', verifyToken, controller.delete.bind(controller));
    app.get(PATH + '/inbox', verifyToken, controller.inbox.bind(controller));
    app.get(PATH + '/dm/:friendId', verifyToken, controller.dm.bind(controller));
}
export {
    init
}