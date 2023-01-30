import sequelize from "sequelize";
const { STRING, FLOAT } = sequelize;
import db from "../../config/database.js";

const User = db.define("user", {
    name: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    balance: {
        type: FLOAT,
        defaultValue: 0
    }
})

export default User;