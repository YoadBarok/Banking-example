import { Sequelize } from "sequelize";

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "postgres",
        logging: false
    }
);

export default db;
