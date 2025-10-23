
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/signup', userData),
  getMe: () => api.get('/auth/me'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  resendVerification: (email) => api.post('/auth/resend-verification', { email }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword })

}

export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getById: (id) => api.get(`/posts/${id}`),
  create: (postData) => api.post('/posts', postData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, postData) => api.put(`/posts/${id}`, postData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/posts/${id}`),
  like: (id) => api.post(`/posts/${id}/like`),
  unlike: (id) => api.delete(`/posts/${id}/like`)
}

export const commentsAPI = {
  getByPost: (postId, params) => api.get(`/comments/posts/${postId}/comments`, { params }),
  getByPostId: (postId) => api.get(`/comments/posts/${postId}/comments`),
  create: (postId, commentData) => api.post(`/comments/posts/${postId}/comments`, commentData),
  delete: (id) => api.delete(`/comments/${id}`),
  update: (id, commentData) => api.put(`/comments/${id}`, commentData), 
  getAll: (params) => api.get('/comments', { params }),
  getByAuthorPosts: (authorId, params) => api.get(`/comments/author/${authorId}`, { params })
};

export const likesAPI = {
  likePost: (postId, reactionType = 'like') => api.post(`/posts/${postId}/like`, { reactionType }),
  unlikePost: (postId) => api.delete(`/posts/${postId}/like`),
  likeComment: (commentId, reactionType = 'like') => api.post(`/comments/${commentId}/like`, { reactionType }),
  unlikeComment: (commentId) => api.delete(`/comments/${commentId}/like`)
};

export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => {
    const config = {}
    if (userData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' }
    }
    return api.put(`/users/${id}`, userData, config)
  },
  delete: (id) => api.delete(`/users/${id}`), // تأكد أن هذا المسار صحيح

// إضافة دوال المتابعة
  follow: (userId) => api.post(`/users/${userId}/follow`),
  unfollow: (userId) => api.delete(`/users/${userId}/follow`),
  getFollowStatus: (userId) => api.get(`/users/${userId}/follow-status`),
  getStats: (userId) => api.get(`/users/${userId}/stats`)



};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params = {}) => api.get('/admin/users', { params }),
  getPosts: (params = {}) => api.get('/admin/posts', { params }),
  getComments: (params = {}) => api.get('/admin/comments', { params })
};


export const readerAPI = {
  getMyLikedPosts: (params = {}) => api.get('/reader/my-likes', { params }),
  getMyComments: (params = {}) => api.get('/reader/my-comments', { params }),
  getMyStats: () => api.get('/reader/stats')
};

export const notificationsAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getStats: () => api.get('/notifications/stats'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`)
};

export default api
