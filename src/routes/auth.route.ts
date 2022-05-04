import { AuthController } from './../controllers/auth.controller';
import { body } from "express-validator";
import { validatorErrorChecker } from "../middleware/validator";
import { verifyToken } from "../middleware/auth";
import Container from 'typedi';
import express from 'express';

const PATH = '/auth';
const controller: AuthController = Container.get(AuthController);
const app: express.Application = Container.get('app');

function init() {
    app.post(PATH + '/signup', 
        body('username').trim().isLength({min:5, max:30}).withMessage('아이디는 최소 5자 최대 30자까지 가능합니다.'),
        body('password').trim().isLength({min:5, max:30}).withMessage('아이디는 최소 5자 최대 30자까지 가능합니다.'),
        validatorErrorChecker, controller.signup.bind(controller));
    
    app.post(PATH + '/signin', [
        body('username').trim().isLength({min:5, max:30}).withMessage('비밀번호는 최소 5자 최대 30자까지 가능합니다.'),
        body('password').trim().isLength({min:5, max:30}).withMessage('비밀번호는 최소 5자 최대 30자까지 가능합니다.'),
    ], controller.signin.bind(controller));

    app.get(PATH + '/logout', verifyToken, controller.logout.bind(controller));
}

export {
    init
}