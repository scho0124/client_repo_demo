import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 4000;

// Mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

app.get("/", (req, res) => res.send("API running 🚀"));

app.listen(PORT, () => console.log(`Server live on port ${PORT}`));
