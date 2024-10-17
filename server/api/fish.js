import { connectDB } from "../database/connect"; // ตรวจสอบให้แน่ใจว่าเส้นทางนี้ถูกต้อง
import mongoose from "mongoose";
import { readBody } from "h3"; // ใช้ readBody จาก h3

const fishSchema = new mongoose.Schema({
  breed: String,
  age: Number,
  size: String,
  color: String,
  gender: String,
  healthStatus: String,
  dateOfRecord: {
    type: Date,
    default: Date.now,
  },
});

// ใช้ชื่อคอลเลคชันที่ต้องการ
const Fish =
  mongoose.models.Fish || mongoose.model("BettaFish", fishSchema, "betta");

export default defineEventHandler(async (event) => {
  await connectDB(); // เชื่อมต่อกับฐานข้อมูล

  if (event.req.method === "POST") {
    const body = await readBody(event); // อ่านข้อมูลจากคำขอ
    const newFish = new Fish(body); // สร้างเอกสารใหม่ในคอลเลคชัน

    try {
      const savedFish = await newFish.save(); // บันทึกข้อมูล
      return savedFish; // ส่งกลับข้อมูลที่บันทึก
    } catch (error) {
      console.error("การบันทึกข้อมูลไม่สำเร็จ:", error);
      return { statusCode: 400, body: "การบันทึกข้อมูลไม่สำเร็จ" };
    }
  }

  if (event.req.method === "GET") {
    const fishes = await Fish.find(); // ดึงข้อมูลทั้งหมดจากคอลเลคชัน
    return fishes;
  }
});
