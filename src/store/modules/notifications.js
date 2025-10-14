const state = {
  notifications: [],
  unreadCount: 0
}

const mutations = {
  ADD_NOTIFICATION(state, notification) {
    state.notifications.unshift({
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      read: false,
      ...notification
    })
    state.unreadCount++
  },
  REMOVE_NOTIFICATION(state, notificationId) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationId
    )
  },
  MARK_AS_READ(state, notificationId) {
    const notification = state.notifications.find(n => n.id === notificationId)
    if (notification && !notification.read) {
      notification.read = true
      state.unreadCount = Math.max(0, state.unreadCount - 1)
    }
  },
  MARK_ALL_AS_READ(state) {
    state.notifications.forEach(notification => {
      notification.read = true
    })
    state.unreadCount = 0
  },
  SET_UNREAD_COUNT(state, count) {
    state.unreadCount = count
  }
}

const actions = {
  addNotification({ commit }, notification) {
    commit('ADD_NOTIFICATION', notification)
    
    // Auto remove after 5 seconds for non-persistent notifications
    if (!notification.persistent) {
      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', notification.id)
      }, 5000)
    }
  },
  removeNotification({ commit }, notificationId) {
    commit('REMOVE_NOTIFICATION', notificationId)
  },
  markAsRead({ commit }, notificationId) {
    commit('MARK_AS_READ', notificationId)
  },
  markAllAsRead({ commit }) {
    commit('MARK_ALL_AS_READ')
  },
  // Handle socket notifications
  handleSocketNotification({ dispatch }, notificationData) {
    dispatch('addNotification', {
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type || 'info',
      action: notificationData.action,
      persistent: notificationData.persistent || false
    })
  }
}

const getters = {
  allNotifications: (state) => state.notifications,
  unreadNotifications: (state) => state.notifications.filter(n => !n.read),
  unreadCount: (state) => state.unreadCount
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}