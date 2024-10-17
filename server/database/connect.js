import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("เชื่อมต่อกับ MongoDB แล้ว");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // ควบคุมเวลาเชื่อมต่อ
    });
    console.log("เชื่อมต่อกับ MongoDB สำเร็จ");
  } catch (error) {
    console.error("ไม่สามารถเชื่อมต่อ MongoDB:", error);
  }
}
