import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import { connectDB } from './database/db.js';

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.get("/api", (req, res) => {
    res.send({
        message: "Invonit server is running..."
    })
})

app.get("/health", (req, res) => {
    res.status(200).send({
        status: "ok"
    })
})

app.listen(PORT,async () => {
    await connectDB();
    console.log("Invonit server is running on http://localhost:5200/");
})