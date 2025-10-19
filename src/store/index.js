// store/index.js
import { createStore } from 'vuex'
import notifications from './modules/notifications'
import { authAPI, notificationsAPI } from '@/services/api'

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
    appInitialized: false
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    },
    SET_TOKEN(state, token) {
      state.token = token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
      this.dispatch('applyDarkMode')
    },
    SET_DARK_MODE(state, value) {
      state.darkMode = value
      localStorage.setItem('darkMode', value)
      this.dispatch('applyDarkMode')
    },
    SET_APP_INITIALIZED(state, value) {
      state.appInitialized = value
    }
  },
  actions: {
    async initializeApp({ commit, dispatch, state }) {
      if (state.appInitialized) return
      
      await dispatch('initializeDarkMode')
      
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await authAPI.getMe()
          if (response.data.success) {
            commit('SET_USER', response.data.data)
            commit('SET_TOKEN', token)
            console.log('App initialized with user:', response.data.data._id)
          }
        } catch (error) {
          console.error('Failed to initialize user:', error)
          commit('LOGOUT')
        }
      }
      
      commit('SET_APP_INITIALIZED', true)
    },
    
    login({ commit }, { user, token }) {
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
    },
    
    logout({ commit }) {
      commit('LOGOUT')
    },
    
    applyDarkMode({ state }) {
      if (state.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    
    initializeDarkMode({ commit, dispatch }) {
      const darkMode = localStorage.getItem('darkMode') === 'true'
      commit('SET_DARK_MODE', darkMode)
      dispatch('applyDarkMode')
    },

    // استخدام الـ actions من الـ module مباشرة
    async fetchNotifications({ dispatch }, params = {}) {
      return await dispatch('notifications/fetchNotifications', params)
    },
    
    async markAsRead({ dispatch }, notificationId) {
      return await dispatch('notifications/markAsRead', notificationId)
    },
    
    async markAllAsRead({ dispatch }) {
      return await dispatch('notifications/markAllAsRead')
    },
    
    async deleteNotification({ dispatch }, notificationId) {
      return await dispatch('notifications/deleteNotification', notificationId)
    },
    
    addNotification({ dispatch }, notification) {
      return dispatch('notifications/addNotification', notification)
    }
  },
  getters: {
    isAppInitialized: state => state.appInitialized
  },
  modules: {
    notifications
  }
})