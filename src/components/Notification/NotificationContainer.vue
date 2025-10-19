<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
    <div
      v-for="notification in localNotifications"
      :key="notification.id"
      :class="[
        'p-4 rounded-lg shadow-lg border transform transition-all duration-300',
        notification.type === 'success' 
          ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
          : notification.type === 'error'
          ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
          : notification.type === 'warning'
          ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
          : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
      ]"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h4 :class="[
            'font-medium text-sm',
            notification.type === 'success' 
              ? 'text-green-800 dark:text-green-300'
              : notification.type === 'error'
              ? 'text-red-800 dark:text-red-300'
              : notification.type === 'warning'
              ? 'text-yellow-800 dark:text-yellow-300'
              : 'text-blue-800 dark:text-blue-300'
          ]">
            {{ notification.title }}
          </h4>
          <p :class="[
            'text-sm mt-1',
            notification.type === 'success' 
              ? 'text-green-600 dark:text-green-400'
              : notification.type === 'error'
              ? 'text-red-600 dark:text-red-400'
              : notification.type === 'warning'
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-blue-600 dark:text-blue-400'
          ]">
            {{ notification.message }}
          </p>
        </div>
        <button
          @click="removeLocalNotification(notification.id)"
          :class="[
            'ml-4 flex-shrink-0 rounded-full p-1 transition-colors',
            notification.type === 'success' 
              ? 'text-green-400 hover:text-green-600'
              : notification.type === 'error'
              ? 'text-red-400 hover:text-red-600'
              : notification.type === 'warning'
              ? 'text-yellow-400 hover:text-yellow-600'
              : 'text-blue-400 hover:text-blue-600'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationContainer',
  data() {
    return {
      localNotifications: []
    }
  },
  mounted() {
    this.setupSocketListeners()
  },
  beforeUnmount() {
    this.cleanupSocketListeners()
  },
  methods: {
    setupSocketListeners() {
      window.addEventListener('socket-newNotification', this.handleNewNotification)
    },
    
    cleanupSocketListeners() {
      window.removeEventListener('socket-newNotification', this.handleNewNotification)
    },
    
    handleNewNotification(event) {
      if (event && event.detail) {
        const notificationData = event.detail
        
        const notification = {
          id: Date.now().toString(),
          title: notificationData.title || 'Notification',
          message: notificationData.message || '',
          type: this.mapNotificationType(notificationData.type),
          timestamp: notificationData.createdAt || new Date()
        }
        
        this.localNotifications.push(notification)
        
        // إزالة الإشعار تلقائياً بعد 5 ثواني
        setTimeout(() => {
          this.removeLocalNotification(notification.id)
        }, 5000)
      }
    },
    
    removeLocalNotification(id) {
      this.localNotifications = this.localNotifications.filter(n => n.id !== id)
    },
    
    mapNotificationType(socketType) {
      const typeMap = {
        'like': 'info',
        'comment': 'info', 
        'follow': 'info',
        'system': 'warning',
        'post_published': 'success',
        'comment_reply': 'info'
      }
      return typeMap[socketType] || 'info'
    }
  }
}
</script>