import express from 'express';
import cors from 'cors';
import { PORT, FRONTEND_URL } from './config/env.js';

const app = express();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());

app.get("/api", (req, res) => {
    res.send({message: "Invonit server is running..."})
})

app.get('/health', (req, res) => res.json({status: "ok"}));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}/`);
})