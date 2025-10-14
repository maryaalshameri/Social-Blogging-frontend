import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.isConnected = false
  }

  connect() {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        console.warn('No token found for socket connection')
        return null
      }

      this.socket = io('http://localhost:5000', {
        auth: {
          token: token
        },
        transports: ['websocket', 'polling']
      })

      this.socket.on('connect', () => {
        console.log('✅ Connected to server via Socket.io')
        this.isConnected = true
        this.emitGlobalEvent('socket-connected', { connected: true })
      })

      this.socket.on('disconnect', () => {
        console.log('❌ Disconnected from server')
        this.isConnected = false
        this.emitGlobalEvent('socket-disconnected', { connected: false })
      })

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error)
        this.isConnected = false
        this.emitGlobalEvent('socket-error', { error: error.message })
      })

      this.socket.on('error', (error) => {
        console.error('Socket error:', error)
        this.emitGlobalEvent('socket-error', { error: error.message })
      })

      // Listen for real-time events
      this.setupEventListeners()

      return this.socket
    } catch (error) {
      console.error('Error connecting socket:', error)
      return null
    }
  }

  setupEventListeners() {
    if (!this.socket) return

    // New post notification
    this.socket.on('newPost', (post) => {
      console.log('Socket: New post received', post)
      this.emitGlobalEvent('socket-newPost', post)
      
      this.showNotification({
        title: 'New Post Published',
        message: `${post.author?.username || 'Someone'} published: ${post.title}`,
        type: 'info',
        action: () => {
          window.location.href = `/posts/${post._id}`
        }
      })
    })

    // New comment notification
    this.socket.on('newComment', (data) => {
      console.log('Socket: New comment received', data)
      this.emitGlobalEvent('socket-newComment', data)
      
      this.showNotification({
        title: 'New Comment',
        message: `${data.comment.author?.username || 'Someone'} commented on a post`,
        type: 'info',
        action: () => {
          window.location.href = `/posts/${data.postId}`
        }
      })
    })

    // New like notification
    this.socket.on('newLike', (data) => {
      console.log('Socket: New like received', data)
      this.emitGlobalEvent('socket-newLike', data)
      
      this.showNotification({
        title: 'New Like',
        message: `Someone liked your ${data.type.toLowerCase()}`,
        type: 'success'
      })
    })

    // User typing notification
    this.socket.on('userTyping', (data) => {
      this.emitGlobalEvent('socket-userTyping', data)
    })
  }

  emitGlobalEvent(eventName, data) {
    // إرسال حدث عام يمكن لأي مكون الاستماع إليه
    const event = new CustomEvent(eventName, { 
      detail: data 
    })
    window.dispatchEvent(event)
  }

  showNotification(notification) {
    // إرسال إشعار للمكونات
    const event = new CustomEvent('socket-notification', { 
      detail: notification 
    })
    window.dispatchEvent(event)
  }

  // باقي الدوال كما هي...
  joinPostRoom(postId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinPost', postId)
    }
  }

  leavePostRoom(postId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leavePost', postId)
    }
  }

  sendTyping(postId, username, isTyping) {
    if (this.socket && this.isConnected) {
      this.socket.emit('userTyping', {
        postId,
        username,
        isTyping
      })
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  getSocket() {
    return this.socket
  }

  getConnectionStatus() {
    return this.isConnected
  }
}

export default new SocketService()