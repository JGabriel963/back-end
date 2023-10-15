import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "jgabriel963",
    password: "130302jg",
    logging: true,
    synchronize: true,
    database: "code_drops",
    entities: ['src/database/entity/*.ts'],
    migrations: ['src/database/migration/*.ts'],
    subscribers: [],
})
