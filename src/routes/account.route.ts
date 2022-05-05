import { AccountController } from '../controllers/account.controller';
import express from 'express';
import { verifyToken } from "../middleware/auth";
import Container from "typedi";

const PATH = '/account';
const controller = Container.get(AccountController);
const app: express.Application = Container.get('app');

function init() {
    app.get(PATH, verifyToken, controller.list.bind(controller));
}

export {
    init
}