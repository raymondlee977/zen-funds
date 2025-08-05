import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import accountGroupRoutes from './routes/accountGroup.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// routes
app.use('/api/user', userRoutes);
app.use('/api/accountGroups', accountGroupRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server listening on http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("❌ MongoDB connection failed:", error.message);
});