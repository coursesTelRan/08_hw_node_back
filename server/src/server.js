import express from "express";
import cors from "cors";
import {router as studentRoutes} from "./routs/studentRouter.js"
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = 8080;
app.use(cors())
app.use(express.json());
app.use(studentRoutes);
//TODO
app.use((req, res) => {
    res.status(404).type('text/plain; charset=utf-8').send('Not Found');
})
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'java59'
        });
        console.log("Connected to the MongoDb");
        app.listen(port, () => {
            console.log(`Server started on port ${port}. Press Ctrl-C to finish`);
        })
    }catch(err){
        console.log('Failed to connect to MongoDB', err);
    }
}
startServer();