import { Router } from 'express'
import SessionController from './controlles/SessionController';

const routes = new Router();

routes.post("/sessions", SessionController.store)

export default routes;