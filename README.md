# 🚀 Social Blogging & Real-Time Platform

An interactive **social blogging platform** built with **Vue 3, Vite, Vuex, Vue Router, Socket.io, and Axios**.  
It allows users to create posts, interact through likes and comments, and receive **real-time updates** without reloading the page.

---

## 📦 Prerequisites

Before getting started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A backend API (Express or Nest.js) running at `http://localhost:5000`

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/username/social-blogging-platform.git
cd social-blogging-platform
```

### 2️⃣ Install dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Run the development server
```bash
npm run dev
```

Then open your browser at:
```
http://localhost:5173
```

### 4️⃣ Build for production
```bash
npm run build
```

### 5️⃣ Preview production build locally
```bash
npm run preview
```

---

## 🧩 Project Structure

```
src/
 ┣ assets/           ← CSS files and images
 ┣ components/       ← Reusable Vue components
 ┣ router/           ← Vue Router (pages and navigation)
 ┣ store/            ← Vuex store (state management)
 ┣ services/
 ┃ ┣ api.js          ← Axios setup and REST API logic
 ┃ ┗ socket.js       ← Socket.io real-time service
 ┣ App.vue           ← Root Vue component
 ┗ main.js           ← Application entry point
```

---

## 🔌 API Integration (Axios)

All backend communication is handled through the centralized file:  
`src/services/api.js`

### ✳️ Axios Setup
```js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})
```

### 🔑 Automatic Token Handling
```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

If the token expires:
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

## 🧠 Available API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and return JWT token |
| `POST` | `/api/auth/forgot-password` | Send password reset email |
| `PUT` | `/api/auth/reset-password/:token` | Reset password using token |

### 👤 Users
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:id` | Get a specific user by ID |
| `POST` | `/api/users/follow/:id` | Follow another user |
| `POST` | `/api/users/unfollow/:id` | Unfollow a user |

### 📝 Posts
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/posts` | Fetch all posts |
| `GET` | `/api/posts/:id` | Fetch a single post |
| `POST` | `/api/posts` | Create a new post |
| `PUT` | `/api/posts/:id` | Edit an existing post |
| `DELETE` | `/api/posts/:id` | Delete a post |

### 💬 Comments
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/comments/:postId` | Get comments for a post |
| `POST` | `/api/comments/:postId` | Add a new comment |
| `DELETE` | `/api/comments/:commentId` | Delete a comment |

### ❤️ Reactions
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/posts/like/:id` | Like a post |
| `POST` | `/api/posts/unlike/:id` | Remove like from a post |

---

## ⚡ Real-Time Integration (Socket.io)

### 🔧 Backend Setup Example
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

  socket.on('likePost', (data) => io.emit('postLiked', data))
  socket.on('unlikePost', (data) => io.emit('postUnliked', data))
  socket.on('addComment', (data) => io.emit('commentAdded', data))
  socket.on('deleteComment', (data) => io.emit('commentDeleted', data))

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id)
  })
})

server.listen(5000, () => console.log('🚀 Server running on port 5000'))
```

---

## 🔔 Main Features

- 🔐 User Authentication (Register / Login / JWT)
- 📝 Create, edit, and delete posts
- 💬 Real-time comment system
- ❤️ Likes and reactions for posts and comments
- 👁️ Live view tracking for posts
- ⚡ Instant updates using Socket.io
- 🌙 Modern UI supporting both Light & Dark modes
- 📱 Fully responsive design

---

## 🧰 Technologies Used

| Category | Tools / Libraries |
|-----------|------------------|
| Frontend | Vue 3, Vite, Vue Router, Vuex |
| Real-time | Socket.io |
| API Requests | Axios |
| Backend | Express.js |
| Database | MongoDB / Mongoose |
| Styling | Tailwind CSS |
| Authentication | JWT (JSON Web Token) |

---

## 🧑‍💻 Author

**Eng. Marya**  
Developed with ❤️ in 2025  
> Educational & open-source project for learning purposes.

---

## 📄 License

This project is open source and licensed under the **MIT License**.  
You are free to use, modify, and distribute it for educational or personal projects.
