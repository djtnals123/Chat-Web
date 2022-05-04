import express from 'express';
import Container from 'typedi';
import { IndexController } from '../controllers/index.controller';
import { verifyToken } from '../middleware/auth';

const controller = Container.get(IndexController);
const app: express.Application = Container.get('app');

function init() {
    app.get('/', controller.index.bind(controller));
    app.get('/users', verifyToken, controller.users.bind(controller));
}
export {
    init
}