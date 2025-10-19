// store/modules/notifications.js
import { notificationsAPI } from '@/services/api'

export default {
  namespaced: true, 
  
  state: {
    notifications: [],
    unreadCount: 0,
    loading: false
  },
  
  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
    
    SET_UNREAD_COUNT(state, count) {
      state.unreadCount = count;
    },
    
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    
    ADD_NOTIFICATION(state, notification) {
      state.notifications.unshift(notification);
      if (!notification.read) {
        state.unreadCount += 1;
      }
    },
    
    MARK_AS_READ(state, notificationId) {
      const notification = state.notifications.find(n => n._id === notificationId);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    MARK_ALL_AS_READ(state) {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    
    REMOVE_NOTIFICATION(state, notificationId) {
      const index = state.notifications.findIndex(n => n._id === notificationId);
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    }
  },
  
  actions: {
    async fetchNotifications({ commit }, params = {}) {
      commit('SET_LOADING', true);
      try {
        const response = await notificationsAPI.getAll(params);
        commit('SET_NOTIFICATIONS', response.data.data);
        commit('SET_UNREAD_COUNT', response.data.pagination?.unreadCount || 0);
        return response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async markAsRead({ commit }, notificationId) {
      try {
        await notificationsAPI.markAsRead(notificationId);
        commit('MARK_AS_READ', notificationId);
      } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
      }
    },
    
    async markAllAsRead({ commit }) {
      try {
        await notificationsAPI.markAllAsRead();
        commit('MARK_ALL_AS_READ');
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
        throw error;
      }
    },
    
    async deleteNotification({ commit }, notificationId) {
      try {
        await notificationsAPI.delete(notificationId);
        commit('REMOVE_NOTIFICATION', notificationId);
      } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
      }
    },
    
    async getNotificationStats({ commit }) {
      try {
        const response = await notificationsAPI.getStats();
        return response.data;
      } catch (error) {
        console.error('Error fetching notification stats:', error);
        throw error;
      }
    },
    
    addNotification({ commit }, notification) {
      commit('ADD_NOTIFICATION', notification);
    }
  },
  
  getters: {
    notifications: state => state.notifications,
    unreadCount: state => state.unreadCount,
    loading: state => state.loading,
    hasUnread: state => state.unreadCount > 0
  }
};