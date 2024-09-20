import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Connected to database!");
  } catch (error) {
    console.log("Connection failed!", error);
    process.exit(1); // Terminate the programme when the connection fails
  }
};

export default connectDB;