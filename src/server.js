import express from "express";
import {router as studentRoutes} from "./routs/studentRouter.js"

const app = express();
const port = 8080;

app.use(express.json());
app.use(studentRoutes);
//TODO
app.use((req, res) => {
    res.status(404).type(`text/plain`);
})
app.listen(port, () => {
    console.log(`Server started on port ${port}. Press CTRL+C to finish`);
})
