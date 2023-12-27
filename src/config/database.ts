import { Pool } from "pg";
import { env } from "./env";


export const connection = new Pool({
    user : env.database.user,
    host : env.database.host,
    database : env.database.database,
    password : env.database.password,
    port : env.database.port
})