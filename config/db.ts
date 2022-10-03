import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGO_URI ?? "";

const connectDB = async () => {
  try {
    mongoose.connect(mongoURI, {}, () => console.log(`MongoDB Connected`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
