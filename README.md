# 🚀 Social Blogging & Real-Time Platform

منصة تواصل ومدونات تفاعلية تعمل بتقنيات **Vue 3 + Vite + Vuex + Vue Router + Socket.io + Axios**  
تمكِّن المستخدمين من إنشاء منشورات، التفاعل معها (إعجاب، تعليق، عرض)، واستقبال التحديثات **لحظيًا** بدون إعادة تحميل الصفحة.

---

## 📦 المتطلبات الأساسية

تأكد من تثبيت الأدوات التالية قبل البدء:

- [Node.js](https://nodejs.org/) (الإصدار 18 أو أعلى)
- [npm](https://www.npmjs.com/) أو [yarn](https://yarnpkg.com/)
- خادم API (Express أو Nest.js) يعمل على `http://localhost:5000`

---

## ⚙️ خطوات التثبيت والتشغيل

### 1️⃣ استنساخ المشروع

```bash
git clone https://github.com/username/social-blogging-platform.git
cd social-blogging-platform
```

### 2️⃣ تثبيت الحزم

```bash
npm install
# أو
yarn install
```

### 3️⃣ تشغيل التطبيق أثناء التطوير

```bash
npm run dev
```

ثم افتح المتصفح على:
```
http://localhost:5173
```

### 4️⃣ بناء نسخة الإنتاج

```bash
npm run build
```

### 5️⃣ تشغيل نسخة الإنتاج محلياً

```bash
npm run preview
```

---

## 🧩 هيكل المشروع

```
src/
 ┣ assets/           ← ملفات CSS وصور الواجهة
 ┣ components/       ← المكونات القابلة لإعادة الاستخدام
 ┣ router/           ← نظام التوجيه (صفحات Vue)
 ┣ store/            ← إدارة الحالة باستخدام Vuex
 ┣ services/
 ┃ ┣ api.js          ← إعداد Axios وواجهات REST API
 ┃ ┗ socket.js       ← خدمة الاتصال الفوري Socket.io
 ┣ App.vue           ← المكون الجذر للتطبيق
 ┗ main.js           ← ملف تهيئة وتشغيل التطبيق
```

---

## 🔌 تكامل الـ API (Axios)

تم إنشاء ملف الخدمة `src/services/api.js` لإدارة جميع الطلبات إلى الخادم.

### ✳️ إعداد Axios

```js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})
```

### 🔑 التحقق التلقائي من التوكن

جميع الطلبات تمر عبر **interceptor** لإضافة التوكن:

```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

وفي حالة انتهاء صلاحية التوكن:

```js
api.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 🧠 واجهات الـ API المتوفرة

(يتم عرض الجداول بنفس المحتوى السابق)

---

## ⚡ التكامل الفوري (Socket.io)

### 🔧 إعداد Socket.io في الخادم (Backend)

داخل مجلد الخادم `server/`، أضف الكود التالي:

```js
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', credentials: true }
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) return next(new Error('Authentication error'))
  next()
})

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id)

  socket.on('joinPost', (postId) => socket.join(postId))
  socket.on('leavePost', (postId) => socket.leave(postId))

  socket.on('likePost', (data) => {
    io.emit('postLiked', data)
  })

  socket.on('unlikePost', (data) => {
    io.emit('postUnliked', data)
  })

  socket.on('addComment', (data) => {
    io.emit('commentAdded', data)
  })

  socket.on('deleteComment', (data) => {
    io.emit('commentDeleted', data)
  })

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id)
  })
})

server.listen(5000, () => console.log('🚀 Server running on port 5000'))
```

---

## 🔔 الميزات الأساسية

- 🔐 تسجيل دخول وتسجيل مستخدم جديد  
- 📝 إنشاء، تعديل، حذف المنشورات  
- 💬 نظام تعليقات فوري  
- ❤️ تفاعلات إعجاب لمنشورات وتعليقات  
- 👁️ تتبع المشاهدات الفورية  
- ⚡ تحديثات لحظية باستخدام Socket.io  
- 🌙 واجهة احترافية تدعم الوضع الداكن والفاتح  
- 📱 تصميم متجاوب بالكامل  

---

## 📄 الترخيص

هذا المشروع مفتوح المصدر لأغراض تعليمية وبحثية.  
© 2025 – Developed with ❤️ by **Eng : MARYA **
