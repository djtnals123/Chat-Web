import express from 'express';
import { verifyToken } from "../middleware/auth";
import { RoomController } from "../controllers/room.controller";
import Container from "typedi";

const PATH = '/room';
const controller = Container.get(RoomController);
const app: express.Application = Container.get('app');

function init() {
    app.get(PATH, verifyToken, controller.list.bind(controller));
    app.get(PATH + '/:id', verifyToken, controller.detail.bind(controller));
}

export {
    init
}