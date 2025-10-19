import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './services/api'
import socketService from './services/socket'

const app = createApp(App)

// Make API available globally
app.config.globalProperties.$http = api

// تهيئة التطبيق قبل التحميل
store.dispatch('initializeApp').then(() => {
  console.log('App initialized, mounting...')
  
  // Connect socket if authenticated
  if (store.state.isAuthenticated) {
    socketService.connect()
  }
  
  app.use(store).use(router).mount('#app')
}).catch(error => {
  console.error('Failed to initialize app:', error)
  app.use(store).use(router).mount('#app')
})