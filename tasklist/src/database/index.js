import  Sequelize  from "sequelize";
import databaseConfig from "../config/database"
import User from "../app/models/User";

const modles = [User]

class Datebase {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        modles.map(model => model.init(this.connection))
    }
}

export default new Datebase()
