<template>
  <div class="relative">
    <!-- Notification Bell with Advanced Animations -->
    <button
      @click="toggleNotifications"
      :class="[
        'p-3 rounded-2xl transition-all duration-500 transform hover:scale-110 relative group',
        'backdrop-blur-sm border',
        darkMode 
          ? 'text-gray-200 hover:text-blue-300 bg-gray-800/50 hover:bg-gray-700/70 border-gray-700' 
          : 'text-gray-600 hover:text-blue-500 bg-white/80 hover:bg-blue-50/90 border-gray-200',
        showDropdown ? 'scale-110 ring-2 ring-blue-400/50' : ''
      ]"
    >
      <!-- Bell Icon with Animation -->
      <div class="relative">
        <svg 
          class="w-6 h-6 transition-all duration-300 group-hover:rotate-12" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          :class="{
            'animate-bell-ring': hasUnread,
            'text-yellow-400': hasUnread && darkMode,
            'text-yellow-500': hasUnread && !darkMode
          }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-3.77-4.11M18 8A6 6 0 106 8c0 3.09.78 5.97 2.11 8.48M12 2v2m0 16v2"/>
        </svg>
        
        <!-- Pulsing Effect for Unread -->
        <div 
          v-if="hasUnread"
          class="absolute -inset-1 rounded-full bg-red-400/30 animate-ping"
        ></div>
      </div>
      
      <!-- Unread Badge with Floating Animation -->
      <span 
        v-if="unreadCount > 0"
        class="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-125"
        :class="{
          'animate-bounce': hasUnread,
          'h-7 w-7': unreadCount > 9
        }"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>

      <!-- Hover Tooltip -->
      <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {{ unreadCount > 0 ? `${unreadCount} unread notifications` : 'No new notifications' }}
        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </button>

    <!-- Notifications Dropdown with Glass Morphism -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 scale-95 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-2"
    >
      <div 
        v-if="showDropdown"
        :class="[
          'absolute right-0 mt-3 w-96 max-h-[480px] rounded-2xl shadow-2xl border backdrop-blur-xl z-50 overflow-hidden',
          'transform-gpu',
          darkMode 
            ? 'bg-gray-900/95 border-gray-700/50' 
            : 'bg-white/95 border-gray-200/50'
        ]"
      >
        <!-- Header -->
        <div class="p-6 border-b backdrop-blur-sm" :class="darkMode ? 'border-gray-700/50' : 'border-gray-200/50'">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <h3 class="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Notifications
              </h3>
              <span 
                v-if="unreadCount > 0"
                class="px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse"
              >
                {{ unreadCount }} new
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <button
                v-if="unreadCount > 0"
                @click="markAllAsRead"
                :class="[
                  'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105',
                  darkMode 
                    ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30' 
                    : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                ]"
              >
                Mark all
              </button>
              <button
                @click="showDropdown = false"
                :class="[
                  'p-2 rounded-lg transition-colors',
                  darkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="overflow-y-auto max-h-80 custom-scrollbar">
          <div 
            v-if="notifications.length === 0"
            class="flex flex-col items-center justify-center py-12 px-6 text-center"
          >
            <div class="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
              <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-3.77-4.11M18 8A6 6 0 106 8c0 3.09.78 5.97 2.11 8.48M12 2v2m0 16v2"/>
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400 font-medium mb-2">No notifications yet</p>
            <p class="text-sm text-gray-400 dark:text-gray-500">We'll notify you when something arrives</p>
          </div>

          <div
            v-for="(notification, index) in notifications"
            :key="notification.id"
            :class="[
              'p-4 border-b cursor-pointer transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden',
              notification.read 
                ? darkMode 
                  ? 'bg-transparent hover:bg-gray-800/50' 
                  : 'bg-transparent hover:bg-gray-50/80'
                : darkMode 
                  ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/10 hover:from-blue-900/30 hover:to-purple-900/20' 
                  : 'bg-gradient-to-r from-blue-50/80 to-purple-50/60 hover:from-blue-100/80 hover:to-purple-100/60',
              darkMode ? 'border-gray-800' : 'border-gray-100'
            ]"
            @click="handleNotificationClick(notification)"
          >
            <!-- Unread Indicator -->
            <div 
              v-if="!notification.read"
              class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"
            ></div>

            <!-- Notification Content -->
            <div class="flex items-start space-x-4">
              <!-- Notification Icon -->
              <div :class="[
                'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white relative',
                getNotificationIcon(notification.type)
              ]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="notification.type === 'like'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  <path v-if="notification.type === 'comment'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  <path v-if="notification.type === 'follow'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                  <path v-if="!['like','comment','follow'].includes(notification.type)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                
                <!-- Pulse effect for unread -->
                <div 
                  v-if="!notification.read"
                  class="absolute inset-0 rounded-xl bg-current opacity-20 animate-ping"
                ></div>
              </div>

              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  {{ notification.message }}
                </p>
                <div class="flex items-center justify-between mt-2">
                  <p class="text-xs text-gray-400 dark:text-gray-500 flex items-center space-x-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ formatTime(notification.timestamp) }}</span>
                  </p>
                  <div 
                    v-if="!notification.read"
                    class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Hover Actions -->
            <div class="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                @click.stop="removeNotification(notification.id)"
                :class="[
                  'p-1 rounded-lg transition-colors',
                  darkMode 
                    ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/30' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t backdrop-blur-sm" :class="darkMode ? 'border-gray-700/50' : 'border-gray-200/50'">
          <button
            @click="showDropdown = false"
            :class="[
              'w-full text-center py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]',
              darkMode 
                ? 'text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/70' 
                : 'text-gray-600 hover:text-gray-800 bg-gray-100/80 hover:bg-gray-200/90'
            ]"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'NotificationBell',
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapState(['darkMode']),
    ...mapState('notifications', ['notifications']),
    ...mapGetters('notifications', ['unreadCount']),
    hasUnread() {
      return this.unreadCount > 0
    }
  },
  methods: {
    ...mapActions('notifications', ['markAsRead', 'markAllAsRead', 'removeNotification']),
    
    toggleNotifications() {
      this.showDropdown = !this.showDropdown
    },
    
    handleNotificationClick(notification) {
      this.markAsRead(notification.id)
      
      if (notification.action) {
        notification.action()
      }
      
      this.showDropdown = false
    },
    
    getNotificationIcon(type) {
      const icons = {
        like: 'bg-gradient-to-br from-red-500 to-pink-600',
        comment: 'bg-gradient-to-br from-blue-500 to-cyan-600',
        follow: 'bg-gradient-to-br from-green-500 to-emerald-600',
        system: 'bg-gradient-to-br from-purple-500 to-indigo-600'
      }
      return icons[type] || icons.system
    },
    
    formatTime(timestamp) {
      const now = new Date()
      const time = new Date(timestamp)
      const diff = now - time
      
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)
      
      if (minutes < 1) return 'Just now'
      if (minutes < 60) return `${minutes}m ago`
      if (hours < 24) return `${hours}h ago`
      if (days < 7) return `${days}d ago`
      
      return time.toLocaleDateString()
    }
  },
  
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  
  handleClickOutside(event) {
    if (!this.$el.contains(event.target)) {
      this.showDropdown = false
    }
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(75, 85, 99, 0.5);
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(75, 85, 99, 0.7);
}

@keyframes bell-ring {
  0%, 100% {
    transform: rotate(0deg);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: rotate(-10deg);
  }
  20%, 40%, 60%, 80% {
    transform: rotate(10deg);
  }
}

.animate-bell-ring {
  animation: bell-ring 2s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>