import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Tweet } from "./entity/tweets"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "0000",
    database: "social_network",
    synchronize: true,
    logging: false,
    entities: [User,Tweet],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    subscribers: [],
})
