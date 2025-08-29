import * as mongoose from 'mongoose';

let isConnected = false; // Prevent multiple connections in dev/hot reload

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/givemeachai', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'givemeachai', // Optional but recommended
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
};

export default connectDB;