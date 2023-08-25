import express from "express";
import path from "path";
import cors from "cors";
import routes from "./routes";
import connectDatabase from "./database";

class App {
  constructor() {
    this.server = express();

    connectDatabase();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;