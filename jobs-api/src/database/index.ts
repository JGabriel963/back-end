import { Sequelize } from "sequelize";

const databaseurl = process.env.DATABASE_URL || ''

export const sequelize = new Sequelize(databaseurl, {
    define: {
        underscored: true
    }
})