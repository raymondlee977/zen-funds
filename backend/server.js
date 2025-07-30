import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  next()
})

// routes
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("❌ MongoDB connection failed:", error.message);
});