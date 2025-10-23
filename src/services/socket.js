import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.isConnected = false
    this.postRooms = new Set()
    this.pendingFollowEvents = new Set()
  }

  connect() {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        console.warn('No token found for socket connection')
        return null
      }

      // إعادة الاتصال إذا كان متصل بالفعل
      if (this.socket && this.isConnected) {
        return this.socket
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
        
        // إعادة الانضمام للغرف بعد إعادة الاتصال
        this.postRooms.forEach(postId => {
          this.joinPostRoom(postId)
        })
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

      // إعداد مستمعي الأحداث
      this.setupEventListeners()

      return this.socket
    } catch (error) {
      console.error('Error connecting socket:', error)
      return null
    }
  }

  setupEventListeners() {
    if (!this.socket) return

    // حدث إعجاب جديد على المنشور
    this.socket.on('postLiked', (data) => {
      console.log('Socket: Post liked received', data)
      this.emitGlobalEvent('socket-postLiked', data)
    })

    this.socket.on('postUnliked', (data) => {
      console.log('Socket: Post unliked received', data)
      this.emitGlobalEvent('socket-postUnliked', data)
    })

    // حدث تعليق جديد
   this.socket.on('commentAdded', (data) => {
    console.log('Socket: Comment added received', data);
    this.emitGlobalEvent('socket-commentAdded', data);
  });

  this.socket.on('commentDeleted', (data) => {
    console.log('Socket: Comment deleted received', data);
    this.emitGlobalEvent('socket-commentDeleted', data);
  });

    // إشعارات جديدة
    this.socket.on('newPost', (post) => {
      console.log('Socket: New post received', post)
      this.emitGlobalEvent('socket-newPost', post)
    })

    this.socket.on('postDeleted', (data) => {
      console.log('Socket: Post deleted received', data);
      this.emitGlobalEvent('socket-postDeleted', data);
    });

    this.socket.on('newComment', (data) => {
      console.log('Socket: New comment received', data)
      this.emitGlobalEvent('socket-newComment', data)
    })

    this.socket.on('newLike', (data) => {
      console.log('Socket: New like received', data)
      this.emitGlobalEvent('socket-newLike', data)
    })

    this.socket.on('commentLiked', (data) => {
    console.log('Socket: Comment liked received', data)
    this.emitGlobalEvent('socket-commentLiked', data)
  })

  this.socket.on('commentUnliked', (data) => {
    console.log('Socket: Comment unliked received', data)
    this.emitGlobalEvent('socket-commentUnliked', data)
  })

  this.socket.on('postViewed', (data) => {
  console.log('Socket: Post view received', data)
  this.emitGlobalEvent('socket-postViewed', data)
})

  this.socket.on('newNotification', (notification) => {
    console.log('New notification received:', notification);
    this.emitGlobalEvent('socket-newNotification', notification);
  });

  // تحديث عدد الإشعارات غير المقروءة
  this.socket.on('unreadCountUpdate', (data) => {
    console.log('Unread count updated:', data.unreadCount);
    this.emitGlobalEvent('socket-unreadCountUpdate', data);
  });

  // تحديث عند قراءة إشعار
  this.socket.on('notificationRead', (data) => {
    console.log('Notification read:', data);
    this.emitGlobalEvent('socket-notificationRead', data);
  });

  // في setupEventListeners
  this.socket.on('userFollowed', (data) => {
    console.log('Socket: User followed received', data);
    this.emitGlobalEvent('socket-userFollowed', data);
  });

  this.socket.on('userUnfollowed', (data) => {
    console.log('Socket: User unfollowed received', data);
    this.emitGlobalEvent('socket-userUnfollowed', data);
  });

  this.socket.on('newFollower', (data) => {
    console.log('Socket: New follower received', data);
    this.emitGlobalEvent('socket-newFollower', data);
  });

    this.socket.on('followStatsUpdate', (data) => {
      console.log('Socket: Follow stats update received', data);
      this.emitGlobalEvent('socket-followStatsUpdate', data);
    });


  }

  // دوال لإرسال الأحداث
  // likePost(postId, userId) {
  //   if (this.socket && this.isConnected) {
  //     this.socket.emit('likePost', { postId, userId })
  //     return true
  //   }
  //   return false
  // }

  // unlikePost(postId, userId) {
  //   if (this.socket && this.isConnected) {
  //     this.socket.emit('unlikePost', { postId, userId })
  //     return true
  //   }
  //   return false
  // }

  // في ملف socket.js داخل class SocketService
followUser(targetUserId, followerId) {
    if (this.socket && this.isConnected) {
      const eventKey = `follow_${followerId}_${targetUserId}`;
      
      // التحقق من عدم إرسال الحدث مسبقاً
      if (this.pendingFollowEvents.has(eventKey)) {
        console.log('Follow event already sent, ignoring duplicate');
        return false;
      }
      
      this.pendingFollowEvents.add(eventKey);
      this.socket.emit('followUser', { targetUserId, followerId });
      
      // إزالة المفتاح بعد فترة لمنع التكرار
      setTimeout(() => {
        this.pendingFollowEvents.delete(eventKey);
      }, 1000);
      
      return true;
    }
    return false;
  }

  unfollowUser(targetUserId, followerId) {
    if (this.socket && this.isConnected) {
      const eventKey = `unfollow_${followerId}_${targetUserId}`;
      
      if (this.pendingFollowEvents.has(eventKey)) {
        console.log('Unfollow event already sent, ignoring duplicate');
        return false;
      }
      
      this.pendingFollowEvents.add(eventKey);
      this.socket.emit('unfollowUser', { targetUserId, followerId });
      
      setTimeout(() => {
        this.pendingFollowEvents.delete(eventKey);
      }, 1000);
      
      return true;
    }
    return false;
  }

  addComment(postId, comment) {
    if (this.socket && this.isConnected) {
      this.socket.emit('addComment', { postId, comment })
      return true
    }
    return false
  }

  deleteComment(commentId, postId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('deleteComment', { commentId, postId })
      return true
    }
    return false
  }

  joinPostRoom(postId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinPost', postId)
      this.postRooms.add(postId)
      console.log(`Joined post room: ${postId}`)
    }
  }

  leavePostRoom(postId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leavePost', postId)
      this.postRooms.delete(postId)
      console.log(`Left post room: ${postId}`)
    }
  }

  emitGlobalEvent(eventName, data) {
    const event = new CustomEvent(eventName, { 
      detail: data 
    })
    window.dispatchEvent(event)
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
      this.postRooms.clear()
    }
  }

  getSocket() {
    return this.socket
  }

  getConnectionStatus() {
    return this.isConnected
  }
    

likePost(postId, userId) {
  if (this.socket && this.isConnected) {
    this.socket.emit('likePost', { postId, userId });
    return true;
  }
  return false;
}

unlikePost(postId, userId) {
  if (this.socket && this.isConnected) {
    this.socket.emit('unlikePost', { postId, userId });
    return true;
  }
  return false;
}

likeComment(commentId, userId) {
  if (this.socket && this.isConnected) {
    this.socket.emit('likeComment', { commentId, userId });
    return true;
  }
  return false;
}

unlikeComment(commentId, userId) {
  if (this.socket && this.isConnected) {
    this.socket.emit('unlikeComment', { commentId, userId });
    return true;
  }
  return false;
}

viewPost(postId, userId) {
  if (this.socket && this.isConnected) {
    this.socket.emit('viewPost', { postId, userId })
    return true
  }
  return false
}

deletePost(postId, deletedBy) {
  if (this.socket && this.isConnected) {
    this.socket.emit('deletePost', { postId, deletedBy });
    return true;
  }
  return false;
}

joinUserRoom(userId) {
  if (this.socket && this.isConnected) {
    this.socket.emit('joinUserRoom', userId);
    console.log(`Joined user room for notifications: ${userId}`);
  }
}

}

export default new SocketService()