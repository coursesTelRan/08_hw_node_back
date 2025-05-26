import express from "express";
import {router as studentRoutes} from "./routs/studentRouter.js"
import dotenv from "dotenv";
import {MongoClient} from "mongodb";
import {init} from "./repository/studentRepository.js";

dotenv.config();
const app = express();
const port = 8080;
const client = new MongoClient(process.env.MONGODB_URI);
const dbName = 'java59';

app.use(express.json());
app.use(studentRoutes);
//TODO
app.use((req, res) => {
    res.status(404).type('text/plain; charset=utf-8').send('Not Found');
})
async function startServer() {
    try {
        await client.connect();
        const db = client.db(dbName)
        init(db);
        app.listen(port, () => {
            console.log(`Server started on port ${port}. Press Ctrl-C to finish`);
        })
    }catch(err){
        console.log('Failed to connect to MongoDB', err);
    }
}
startServer();