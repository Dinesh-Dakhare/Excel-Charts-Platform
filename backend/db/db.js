import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // MongoDB with username/password authentication
    const atlasUri  = process.env.MONGODB_URI
    await mongoose.connect(atlasUri , {
    //   maxPoolSize: 10,
    //   serverSelectionTimeoutMS: 5000,
    //   socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB with authentication');
  } catch (error) {
    console.error('❌ Authenticated connection failed:', error.message);
    throw error;
  }

};

export default connectDb