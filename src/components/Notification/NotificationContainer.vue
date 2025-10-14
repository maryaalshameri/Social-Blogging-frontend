<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
    <div
      v-for="notification in notifications"
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
          @click="removeNotification(notification.id)"
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
      <div class="mt-2 flex items-center space-x-4">
        <button
          v-if="notification.action"
          @click="handleAction(notification)"
          class="text-xs font-medium underline hover:no-underline transition-all"
          :class="[
            notification.type === 'success' 
              ? 'text-green-600 dark:text-green-400'
              : notification.type === 'error'
              ? 'text-red-600 dark:text-red-400'
              : notification.type === 'warning'
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-blue-600 dark:text-blue-400'
          ]"
        >
          View
        </button>
        <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
          <div
            class="h-1 rounded-full transition-all duration-300"
            :class="[
              notification.type === 'success' 
                ? 'bg-green-500'
                : notification.type === 'error'
                ? 'bg-red-500'
                : notification.type === 'warning'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            ]"
            :style="{ width: `${notification.progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NotificationContainer',
  computed: {
    ...mapState('notifications', ['notifications'])
  },
  mounted() {
    this.setupSocketListeners()
  },
  beforeUnmount() {
    this.cleanupSocketListeners()
  },
  methods: {
    ...mapActions('notifications', ['addNotification', 'removeNotification']),
    
    setupSocketListeners() {
      // إصلاح: استخدام event.detail بشكل صحيح
      window.addEventListener('socket-notification', (event) => {
        if (event && event.detail) {
          this.handleSocketNotification(event.detail)
        }
      })
    },
    
    cleanupSocketListeners() {
      window.removeEventListener('socket-notification', this.handleSocketNotification)
    },
    
    handleSocketNotification(notificationData) {
      // إصلاح: التأكد من أن notificationData موجود
      if (!notificationData) return
      
      const notification = {
        id: Date.now().toString(),
        title: notificationData.title || 'Notification',
        message: notificationData.message || '',
        type: notificationData.type || 'info',
        action: notificationData.action || null,
        progress: 100,
        duration: notificationData.duration || 5000
      }
      
      this.addNotification(notification)
      
      // بدء العد التنازلي للتقدم
      const interval = setInterval(() => {
        notification.progress -= 1
        if (notification.progress <= 0) {
          clearInterval(interval)
          this.removeNotification(notification.id)
        }
      }, notification.duration / 100)
    },
    
    handleAction(notification) {
      if (notification.action && typeof notification.action === 'function') {
        notification.action()
      }
      this.removeNotification(notification.id)
    }
  }
}
</script>