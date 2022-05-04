import express from 'express';
import { verifyToken } from "../middleware/auth";
import Container from "typedi";
import { FollowController } from "../controllers/follow.controller";

const PATH = '/follow';
const controller: FollowController = Container.get(FollowController);
const app: express.Application = Container.get('app');

function init() {
    app.get(PATH + '/follower' , verifyToken, controller.followerList.bind(controller));
    app.get(PATH + '/followee' , verifyToken, controller.followeeList.bind(controller));
    app.post(PATH , verifyToken, controller.follow.bind(controller));
    app.delete(PATH + '/:followeeId' , verifyToken, controller.unfollow.bind(controller));
}


export {
    init
}