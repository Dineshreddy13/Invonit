import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import { connectDB } from './database/db.js';
import authRoutes from "./modules/auth/auth.routes.js";
import businessRoutes from "./modules/business/business.routes.js";
import partiesRoutes from "./modules/parties/parties.routes.js";
import categoriesRoutes from "./modules/categories/categories.routes.js";
import "./jobs/workers/email.worker.js"; // start worker


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/business/:businessId/parties", partiesRoutes);
app.use("/api/business/:businessId/categories", categoriesRoutes);


app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

const start = async () => {
  await connectDB();
  app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT || 5000}`);
  });
};

start();