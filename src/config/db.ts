import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    mongoose.connect(MONGO_URI as string, {
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};
export default connectDB;
