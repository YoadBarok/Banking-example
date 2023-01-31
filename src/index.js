import env from "dotenv/config";
import db from "../config/database.js";
import app from "./server.js";

const PORT = process.env.PORT || 3000;

async function connect(){
    await db.sync({
        alter: false,
        force: false
    })
};

await connect();

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})