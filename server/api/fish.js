import { connectDB } from "../database/connect"; // ตรวจสอบให้แน่ใจว่าเส้นทางนี้ถูกต้อง
import mongoose from "mongoose";
import { readBody } from "h3"; // ใช้ readBody จาก h3
import Grid from "gridfs-stream";
import multer from "multer";

// กำหนดการตั้งค่า multer
const storage = multer.memoryStorage(); // เก็บไฟล์ในหน่วยความจำ
const upload = multer();
const fishSchema = new mongoose.Schema({
  breed: String,
  age: Number,
  size: String,
  color: String,
  gender: String,
  healthStatus: String,
  image: {
    type: String,
    required: true,
  },
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

  const db = mongoose.connection; // ดึงการเชื่อมต่อฐานข้อมูล
  const gfs = Grid(db.db, mongoose.mongo); // สร้าง GridFS stream

  if (event.req.method === "POST") {
    const body = await readBody(event); // อ่านข้อมูลจากคำขอ

    // ใช้ multer เพื่อจัดการการอัพโหลดไฟล์
    await new Promise((resolve, reject) => {
      upload.single("image")(event.req, event.res, (err) => {
        if (err) {
          console.error("Multer error:", err);
          return reject(err); // หรือส่งกลับข้อความข้อผิดพลาดที่เหมาะสม
        }
        resolve();
      });
    });

    const file = event.req.file; // เข้าถึงไฟล์ที่อัพโหลด

    if (file) {
      const writeStream = gfs.createWriteStream({
        filename: file.originalname, // ชื่อไฟล์ที่ต้องการเก็บใน MongoDB
      });

      // เขียน Buffer ไปยัง GridFS
      writeStream.end(file.buffer); // ใช้ buffer ของไฟล์

      writeStream.on("close", async (file) => {
        const newFish = new Fish({ ...body, image: file.filename }); // สร้างเอกสารใหม่ในคอลเลคชัน
        try {
          const savedFish = await newFish.save(); // บันทึกข้อมูล
          return savedFish; // ส่งกลับข้อมูลที่บันทึก
        } catch (error) {
          console.error("การบันทึกข้อมูลไม่สำเร็จ:", error);
          return { statusCode: 400, body: "การบันทึกข้อมูลไม่สำเร็จ" };
        }
      });
    } else {
      return { statusCode: 400, body: "ไม่มีไฟล์แนบ" };
    }
  }

  if (event.req.method === "GET") {
    const fishes = await Fish.find(); // ดึงข้อมูลทั้งหมดจากคอลเลคชัน
    return fishes;
  }
});
