import express from 'express'
import mongoose from 'mongoose';
import routes from './routes';
import connectDatabase from './database';

class App {
    constructor() {
        this.server = express();

        connectDatabase()
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }
}

export default new App().server;