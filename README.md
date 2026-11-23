# CPE102 Group Viewbook (Engineering Exploration 1/2026)

เว็บไซต์บันทึกการเรียนรู้แบบกลุ่มสำหรับวิชา **CPE102 Engineering Exploration** ที่ออกแบบโดยผสานสไตล์ของ:
- **Group Viewbook & Freshmen Guide (แบบ Link 1)**: มีปุ่มสลับธีม Light/Dark, สัดส่วนคะแนน, คำแนะนำถึงรุ่นน้อง (`Tip for freshmen`) และหน้าต่างขยายรูป Lightbox
- **Blueprint & Technical Study Log (แบบ Link 2)**: มีพื้นหลัง Grid แบบแปลน CAD + Orthographic SVG Diagram + Titleblock, ตาราง Key-Value, Terminal Snippets และ Interactive Checklist ที่จำสถานะการติ๊กได้อัตโนมัติ

---

## วิธีเปิดดูและทดสอบในเครื่อง (Local Preview)

1. **เปิดแบบง่ายที่สุด**: ดับเบิลคลิกไฟล์ `index.html` เพื่อเปิดผ่านเบราว์เซอร์ได้ทันที (ไม่ต้องลง Node.js หรือรัน Build)
2. **เปิดผ่าน Local HTTP Server (แนะนำ)**:
   ```bash
   python -m http.server 8000
   ```
   แล้วเปิดเบราว์เซอร์ไปที่ `http://localhost:8000`

---

## การแบ่งงานให้เพื่อนในกลุ่ม (Zero-Conflict Parallel Workflow)

โครงสร้างเว็บแยกข้อมูลเนื้อหาออกจากโค้ดหลัก (`app.js` และ `styles.css`) ทำให้เพื่อนทุกคนแก้ไขไฟล์ของตัวเองพร้อมกันได้โดยไม่ชนกันตอน Merge Git:

| หน้าที่ / Part | ไฟล์ที่ต้องแก้ | สิ่งที่ต้องทำ |
| :--- | :--- | :--- |
| **ภาพรวมกลุ่ม & ข้อมูลวิชา** (Group Lead) | `data/site.js` | แก้ชื่อกลุ่ม (`Group C00`), ห้องเรียน, คำอธิบายวิชา, สัดส่วนคะแนน, แหล่งอ้างอิง |
| **สมาชิกคนที่ 1: เนื้อหาครึ่งเทอมแรก** | `data/weeks-part1.js` | เขียนสรุปบทเรียน, What we did, Concepts, Freshmen Tips และ Checklist ของ **Week 01–07** + ใส่รูป `w01-1.jpg` ถึง `w07-3.jpg` |
| **สมาชิกคนที่ 2: เนื้อหาครึ่งเทอมหลัง** | `data/weeks-part2.js` | เขียนสรุปบทเรียน **Week 08–13**, ลิงก์เกม itch.io (W10), อัปเดตกิจกรรม **Week 14–16** + ใส่รูป `w08-1.jpg` ถึง `w10-3.jpg` |
| **สมาชิกคนที่ 3: หน้า Showcase โปรเจกต์** | `data/projects.js` | กรอกสเปกหุ่นยนต์, ตาราง Design Evolution, Pipeline, ลิงก์ PDF (Project 1) และชื่อ/ฟีเจอร์/Timeline/ลิงก์ Prototype (Project 2) + ใส่รูป `robot-*.jpg`, `final-*.jpg` |
| **สมาชิกคนที่ 4: Reflection, Team & ภาพลักษณ์** | `data/team-reflection.js` (และ `styles.css` หากอยากปรับสี) | เขียน Looking Back Reflection, คำแนะนำรุ่นน้อง 5 ข้อ, กรอกชื่อ/รหัสนักศึกษา/หน้าที่ของทุกคน และอัปเดตรูปสมาชิก |

*(หากมีสมาชิก 5 คน สามารถให้คนที่ 5 ดูแลฝ่าย **Media, Photos & QA** คอยครอปรูป ตรวจคำผิด ตรวจลิงก์ และ Deploy ขึ้น Vercel)*

---

## วิธีใส่รูปภาพจริง

1. นำไฟล์รูป (`.jpg`, `.png`, `.webp`) มาวางในโฟลเดอร์ `assets/img/`
2. เปิดไฟล์ `data/*.js` ที่รับผิดชอบ แล้วแก้ช่อง `src: ""` เป็น path ของไฟล์ เช่น:
   ```js
   src: "assets/img/w01-1.jpg"
   ```
3. หากยังไม่มีรูป (ปล่อย `src: ""` ไว้) เว็บจะแสดงการ์ด Placeholder แบบ Blueprint พร้อมบอกชื่อไฟล์ที่ควรนำมาใส่ให้โดยอัตโนมัติ

---

## วิธี Deploy ขึ้น Vercel

1. Push โฟลเดอร์โปรเจกต์ขึ้น GitHub Repository ของกลุ่ม
2. เข้า [vercel.com](https://vercel.com) → **Add New Project** → เลือก Repo นี้
3. ตั้งค่า **Framework Preset** เป็น **Other** (Static Site) และ **Build Command** เว้นว่างไว้ กด **Deploy** ได้เลยทันที
