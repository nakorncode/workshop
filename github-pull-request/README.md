# GitHub Pull Request

## ขั้นตอนการฝึกใช้ GitHub Pull Request

1. Fork [https://github.com/nakorncode/workshop](https://github.com/nakorncode/workshop)
2. Clone โปรเจกต์ที่เพิ่งได้ Fork ลงบนเครื่องของเรา
3. เพิ่มไฟล์ที่โฟลเดอร์ `./github-pull-request/src/content/programmers/*.json` ตั้งชื่อไฟล์เป็นชื่อจริง-นามสกุลของเรา สามารถดูจากตัวอย่างคนอื่นได้
4. กำหนดข้อมูลรูปแบบด้านล่างที่ถูกต้อง สำหรับแสดงผลข้อมูลโปรไฟล์ของเรา
5. สำหรับผู้สนใจดูตัวอย่างผลลัพธ์ สามารถติดตั้ง [Node.js](https://nodejs.org) และใช้คำสั่ง `npm install && npm run dev` ที่โฟลเดอร์นี้
6. Commit และ Push ไปยัง Remote Repository ของคุณ
7. ส่งคำขอ Pull Request มาที่ [https://github.com/nakorncode/workshop/pulls](https://github.com/nakorncode/workshop/pulls) โดยเลือก Forked Repository ของคุณ และสามารถเขียนคำขอได้อย่างอิสระ
8. รอการรับ Pull Request จากผู้สอน จากนั้นระบบจะสร้างหน้าเว็บพร้อมข้อมูลใหม่ หากไม่มีการตอบกลับบน Pull Request แนะนำให้ติดต่อผู้สอนที่ [Facebook: นครโค้ด](https://www.facebook.com/nakorncode)

## โครงสร้างไฟล์ JSON

```json
{
  "displayName": "ชื่อจริง-นามสกุล",
  "message": "(ไม่บังคับ) ข้อความที่จะแสดงผล",
  "githubUrl": "(ไม่บังคับ) URL ของ GitHub ต้องเป็นรูปแบบลิงก์ที่ถูกต้อง",
  "created": Unix TimeStamp โดยต้องไม่มีเครื่องหมาย Double-quote เพราะต้องเป็นจำนวนเต็ม และนำเวลาปัจจุบันมาใช้ แนะนำสร้างจาก Text Power Tools
}
```
