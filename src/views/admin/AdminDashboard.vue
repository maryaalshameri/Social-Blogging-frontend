<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 :class="[
        'text-3xl font-bold mb-2',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        Admin Dashboard 👑
      </h1>
      <p :class="[
        'text-lg',
        darkMode ? 'text-gray-300' : 'text-gray-600'
      ]">
        Manage your blogging platform
      </p>
    </div>

    <!-- Admin Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Users -->
      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Total Users
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalUsers || 0 }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Posts -->
      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Total Posts
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalPosts || 0 }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Comments -->
      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Total Comments
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalComments || 0 }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Likes -->
      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Total Likes
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalLikes || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Users -->
      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center justify-between mb-6">
          <h2 :class="[
            'text-xl font-semibold',
            darkMode ? 'text-white' : 'text-gray-900'
          ]">
            Recent Users
          </h2>
          <router-link 
            to="/admin/users"
            class="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
          >
            View All
          </router-link>
        </div>

        <div v-if="recentUsers.length > 0" class="space-y-4">
          <div 
            v-for="user in recentUsers" 
            :key="user._id"
            class="flex items-center justify-between p-3 rounded-lg border"
            :class="darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'"
          >
            <div class="flex items-center space-x-3">
              <img 
                v-if="user.avatar" 
                :src="`http://localhost:5000${user.avatar}`" 
                class="w-10 h-10 rounded-full object-cover"
              />
              <div v-else :class="[
                'w-10 h-10 rounded-full flex items-center justify-center',
                darkMode ? 'bg-gray-600' : 'bg-gray-300'
              ]">
                <span :class="[
                  'text-sm font-medium',
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                ]">
                  {{ user.username?.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <p :class="[
                  'font-medium',
                  darkMode ? 'text-white' : 'text-gray-900'
                ]">
                  {{ user.username }}
                </p>
                <p :class="[
                  'text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  {{ user.email }}
                </p>
              </div>
            </div>
            <span :class="[
              'px-2 py-1 text-xs rounded-full',
              user.role === 'admin' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                : user.role === 'author'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            ]">
              {{ user.role }}
            </span>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <p :class="[
            'text-gray-500 dark:text-gray-400',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          ]">
            No users found
          </p>
        </div>
      </div>

      <!-- Recent Posts -->
      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center justify-between mb-6">
          <h2 :class="[
            'text-xl font-semibold',
            darkMode ? 'text-white' : 'text-gray-900'
          ]">
            Recent Posts
          </h2>
          <router-link 
            to="/admin/posts"
            class="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
          >
            View All
          </router-link>
        </div>

        <div v-if="recentPosts.length > 0" class="space-y-4">
          <div 
            v-for="post in recentPosts" 
            :key="post._id"
            class="p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all"
            :class="darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-white'"
            @click="$router.push(`/posts/${post._id}`)"
          >
            <div class="flex items-center justify-between mb-2">
              <h3 :class="[
                'font-medium text-sm',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ post.title }}
              </h3>
              <span :class="[
                'px-2 py-1 text-xs rounded-full',
                post.status === 'published' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              ]">
                {{ post.status }}
              </span>
            </div>
            <div class="flex items-center justify-between text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
              <span>By {{ post.author?.username }}</span>
              <span>{{ formatDate(post.createdAt) }}</span>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <p :class="[
            darkMode ? 'text-gray-400' : 'text-gray-500'
          ]">
            No posts found
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div :class="[
      'rounded-xl p-6 mt-8',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <h2 :class="[
        'text-xl font-semibold mb-6',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        Quick Actions
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          to="/admin/users"
          :class="[
            'p-4 rounded-lg border-2 text-center transition-all hover:shadow-md',
            darkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' 
              : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
          ]"
        >
          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
          </div>
          <h3 class="font-semibold">Manage Users</h3>
          <p class="text-sm opacity-75 mt-1">View and manage all users</p>
        </router-link>

        <router-link
          to="/admin/posts"
          :class="[
            'p-4 rounded-lg border-2 text-center transition-all hover:shadow-md',
            darkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' 
              : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
          ]"
        >
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <h3 class="font-semibold">Manage Posts</h3>
          <p class="text-sm opacity-75 mt-1">Review and moderate posts</p>
        </router-link>

        <router-link
          to="/admin/comments"
          :class="[
            'p-4 rounded-lg border-2 text-center transition-all hover:shadow-md',
            darkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' 
              : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
          ]"
        >
          <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h3 class="font-semibold">Manage Comments</h3>
          <p class="text-sm opacity-75 mt-1">Moderate user comments</p>
        </router-link>

        <router-link
          to="/admin/settings"
          :class="[
            'p-4 rounded-lg border-2 text-center transition-all hover:shadow-md',
            darkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white' 
              : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
          ]"
        >
          <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="font-semibold">Settings</h3>
          <p class="text-sm opacity-75 mt-1">Platform configuration</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersAPI, postsAPI } from '@/services/api'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      adminStats: {},
      recentUsers: [],
      recentPosts: [],
      loading: false
    }
  },
  computed: {
    ...mapState(['user', 'darkMode'])
  },
  async mounted() {
    await this.loadAdminData()
  },
  methods: {
    async loadAdminData() {
      this.loading = true
      try {
        // Load all users
        const usersResponse = await usersAPI.getAll({ limit: 5 })
        if (usersResponse.data.success) {
          this.recentUsers = usersResponse.data.data
        }

        // Load all posts
        const postsResponse = await postsAPI.getAll({ limit: 5, sortBy: 'createdAt', order: 'desc' })
        if (postsResponse.data.success) {
          this.recentPosts = postsResponse.data.data
        }

        // Calculate admin stats
        this.calculateAdminStats()

      } catch (error) {
        console.error('Error loading admin data:', error)
        this.generateMockAdminData()
      } finally {
        this.loading = false
      }
    },

    calculateAdminStats() {
      this.adminStats = {
        totalUsers: this.recentUsers.length,
        totalPosts: this.recentPosts.length,
        totalComments: this.recentPosts.reduce((sum, post) => sum + (post.commentsCount || 0), 0),
        totalLikes: this.recentPosts.reduce((sum, post) => sum + (post.likesCount || 0), 0)
      }
    },

    generateMockAdminData() {
      // Mock data for demo
      // this.recentUsers = [
      //   {
      //     _id: '1',
      //     username: 'admin',
      //     email: 'admin@bloghub.com',
      //     role: 'admin',
      //     avatar: null
      //   },
      //   {
      //     _id: '2',
      //     username: 'author1',
      //     email: 'author1@bloghub.com',
      //     role: 'author',
      //     avatar: null
      //   }
      // ]

      // this.recentPosts = [
      //   {
      //     _id: '1',
      //     title: 'Welcome to BlogHub',
      //     author: { username: 'admin' },
      //     status: 'published',
      //     createdAt: new Date(),
      //     commentsCount: 5,
      //     likesCount: 10
      //   }
      // ]

      this.calculateAdminStats()
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>