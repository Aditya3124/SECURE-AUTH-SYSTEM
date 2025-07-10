import mongoose from "mongoose";

const connectDB = async () => {
  const connectToDb = await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`MongoDB connected successfully`);
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      process.exit(1); 
    });
  return connectToDb;
}

export default connectDB;