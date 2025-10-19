<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 :class="[
        'text-3xl font-bold mb-2',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        My Liked Posts ❤️
      </h1>
      <p :class="[
        'text-lg',
        darkMode ? 'text-gray-300' : 'text-gray-600'
      ]">
        All posts you've liked and loved
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              Total Liked Posts
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.totalLikes || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              This Month
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.thisMonth || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Most Active Category
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.topCategory || 'N/A' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Posts Grid -->
    <div :class="[
      'rounded-xl p-6',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <div class="flex items-center justify-between mb-6">
        <h2 :class="[
          'text-xl font-semibold',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          Liked Posts ({{ likedPosts.length }})
        </h2>
        
        <div class="flex items-center space-x-4">
          <select 
            v-model="sortBy"
            :class="[
              'px-3 py-2 rounded-lg border text-sm',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-700'
            ]"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="likesCount">Sort by Likes</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p :class="['mt-4', darkMode ? 'text-gray-400' : 'text-gray-500']">
          Loading your liked posts...
        </p>
      </div>

      <!-- Posts List -->
      <div v-else-if="likedPosts.length > 0" class="space-y-4">
        <div 
          v-for="post in likedPosts" 
          :key="post._id"
          :class="[
            'p-4 rounded-lg border transition-all cursor-pointer hover:shadow-lg',
            darkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'bg-gray-50 border-gray-200 hover:bg-white'
          ]"
          @click="$router.push(`/posts/${post._id}`)"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h3 :class="[
                'font-semibold text-lg mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ post.title }}
              </h3>
              <p class="text-sm line-clamp-2 mb-3" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
                {{ post.content }}
              </p>
            </div>
            <div class="flex items-center space-x-2 ml-4">
              <span class="text-red-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
              </span>
              <span class="text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                You liked this
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
            <div class="flex items-center space-x-4">
              <span>By {{ post.author?.username }}</span>
              <span>{{ formatDate(post.createdAt) }}</span>
              <span>{{ post.views }} views</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
                <span>{{ post.likesCount }}</span>
              </span>
              <span class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span>{{ post.commentsCount }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 text-gray-400">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
          </svg>
        </div>
        <h3 :class="['text-lg font-medium mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          No liked posts yet
        </h3>
        <p :class="['mb-6', darkMode ? 'text-gray-400' : 'text-gray-500']">
          Start exploring and like posts that interest you!
        </p>
        <router-link 
          to="/"
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-colors',
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          ]"
        >
          Explore Posts
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { readerAPI } from '../../services/api'

export default {
  name: 'MyLikes',
  data() {
    return {
      likedPosts: [],
      loading: false,
      sortBy: 'createdAt',
      stats: {
        totalLikes: 0,
        thisMonth: 0,
        topCategory: ''
      }
    }
  },
  computed: {
    ...mapState(['user', 'darkMode'])
  },
  watch: {
    sortBy() {
      this.loadLikedPosts()
    }
  },
  async mounted() {
    await this.loadLikedPosts()
    await this.loadStats()
  },
  methods: {
    async loadLikedPosts() {
      this.loading = true
      try {
        const response = await readerAPI.getMyLikedPosts({
          sortBy: this.sortBy,
          order: 'desc'
        })
        
        if (response.data.success) {
          this.likedPosts = response.data.data
        }
      } catch (error) {
        console.error('Error loading liked posts:', error)
        // Fallback to mock data for demo
        this.generateMockData()
      } finally {
        this.loading = false
      }
    },

    async loadStats() {
      try {
        const response = await readerAPI.getMyStats()
        if (response.data.success) {
          this.stats = response.data.data
        }
      } catch (error) {
        console.error('Error loading stats:', error)
        this.stats = {
          totalLikes: this.likedPosts.length,
          thisMonth: Math.floor(this.likedPosts.length * 0.3),
          topCategory: 'Technology'
        }
      }
    },

    generateMockData() {
      // Mock data for demonstration
      this.likedPosts = [
        {
          _id: '1',
          title: 'Understanding Vue 3 Composition API',
          content: 'A comprehensive guide to Vue 3 Composition API and how it improves code organization...',
          author: { username: 'vueMaster' },
          views: 150,
          likesCount: 25,
          commentsCount: 8,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Node.js Best Practices 2024',
          content: 'Learn the latest best practices for building scalable Node.js applications...',
          author: { username: 'nodeExpert' },
          views: 89,
          likesCount: 15,
          commentsCount: 3,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>