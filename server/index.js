import express from "express";
import cors from 'cors';
import { PORT } from "./config/env.js";
import {connectDB} from "./database/db.js"; 

const app = express();
app.use(express.json())
app.use(cors());


app.get('/health', (req, res) => res.json({ status: 'ok' }));

const startServer = async () => {
  try {
    console.log("Starting server.")
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);
    process.exit(1);
  }
};
startServer();