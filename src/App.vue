<template>
  <div id="app" :class="[
    'min-h-screen transition-colors duration-200',
    darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
  ]">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
    <NotificationContainer />
      <ToastContainer /> 
  </div>
</template>

<script>
import Navbar from './components/Layout/Navbar.vue'
import NotificationContainer from './components/Notification/NotificationContainer.vue'
import ToastContainer from './components/Common/ToastContainer.vue'
import socketService from './services/socket'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    // NotificationContainer, // تعليق إذا كنت تريد إزالته
    ToastContainer
  },
  computed: {
    ...mapState(['darkMode', 'isAuthenticated', 'user'])
  },
  async mounted() {
    await this.initializeApp()
    this.setupSocketListeners()
  },
  methods: {
    ...mapActions(['initializeDarkMode', 'logout']),
    
    async initializeApp() {
      // تهيئة الوضع الداكن أولاً
      await this.initializeDarkMode()
      
      // لا تقم بتحميل بيانات المستخدم هنا - دع المتجر يتعامل مع هذا
      console.log('App initialized, user status:', this.isAuthenticated)
      
      // Connect socket if authenticated
      if (this.isAuthenticated && this.user) {
        console.log('Connecting socket for user:', this.user._id)
        socketService.connect()
        socketService.joinUserRoom(this.user._id)
      }
    },
    
    setupSocketListeners() {
      // استماع للإشعارات الجديدة
      window.addEventListener('socket-newNotification', (event) => {
        if (event.detail) {
          console.log('New notification received:', event.detail)
          // إضافة للإشعارات المحلية فقط
          this.$store.dispatch('addNotification', event.detail)
        }
      })
      
      // تحديث عدد الإشعارات غير المقروءة
      window.addEventListener('socket-unreadCountUpdate', (event) => {
        if (event.detail) {
          this.$store.commit('notifications/SET_UNREAD_COUNT', event.detail.unreadCount)
        }
      })
    }
  },
  
  beforeUnmount() {
    window.removeEventListener('socket-newNotification', this.handleNewNotification)
    window.removeEventListener('socket-unreadCountUpdate', this.handleUnreadCountUpdate)
  },
  
  watch: {
    isAuthenticated(newVal) {
      if (newVal && this.user) {
        console.log('User authenticated, connecting socket...')
        socketService.connect()
        socketService.joinUserRoom(this.user._id)
      } else {
        console.log('User logged out, disconnecting socket...')
        socketService.disconnect()
      }
    }
  }
}
</script>