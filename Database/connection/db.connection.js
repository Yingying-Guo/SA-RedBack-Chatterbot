import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to database!");
  } catch (error) {
    console.log("Connection failed!", error);
    process.exit(1); // 在连接失败时终止程序
  }
};

export default connectDB;