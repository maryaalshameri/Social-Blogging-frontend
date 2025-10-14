<template>
  <div class="max-w-6xl mx-auto" v-if="profileUser">
    <!-- Header Section -->
    <div :class="[
      'rounded-xl p-8 mb-8 text-center relative',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <!-- Cover Photo (Optional) -->
      <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-10"></div>
      
      <div class="relative">
        <!-- Avatar -->
        <div class="flex justify-center mb-6">
          <img 
            v-if="profileUser.avatar" 
            :src="`http://localhost:5000${profileUser.avatar}`" 
            class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div v-else :class="[
            'w-32 h-32 rounded-full flex items-center justify-center border-4 text-4xl font-bold',
            darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-300 border-white text-gray-600 shadow-lg'
          ]">
            {{ profileUser.username?.charAt(0).toUpperCase() }}
          </div>
        </div>

        <!-- User Info -->
        <h1 :class="[
          'text-4xl font-bold mb-2',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          {{ profileUser.username }}
        </h1>
        
        <p :class="[
          'inline-block px-4 py-2 rounded-full text-lg font-medium mb-4',
          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
        ]">
          {{ profileUser.role }}
        </p>

        <!-- Bio -->
        <p 
          v-if="profileUser.bio"
          :class="[
            'text-lg max-w-2xl mx-auto mb-6',
            darkMode ? 'text-gray-300' : 'text-gray-600'
          ]"
        >
          {{ profileUser.bio }}
        </p>

        <!-- Stats -->
        <div class="flex justify-center space-x-8">
          <div class="text-center">
            <div :class="[
              'text-2xl font-bold mb-1',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ userStats.postsCount || 0 }}
            </div>
            <div :class="[
              'text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Posts
            </div>
          </div>
          <div class="text-center">
            <div :class="[
              'text-2xl font-bold mb-1',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ userStats.followersCount || 0 }}
            </div>
            <div :class="[
              'text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Followers
            </div>
          </div>
          <div class="text-center">
            <div :class="[
              'text-2xl font-bold mb-1',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ userStats.followingCount || 0 }}
            </div>
            <div :class="[
              'text-sm',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Following
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center space-x-4 mt-6">
          <button
            v-if="isOwnProfile"
            @click="$router.push('/profile')"
            :class="[
              'px-6 py-2 rounded-lg font-medium transition-colors',
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            Edit Profile
          </button>
          <button
            v-else
            @click="toggleFollow"
            :class="[
              'px-6 py-2 rounded-lg font-medium text-white transition-colors',
              isFollowing
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            {{ isFollowing ? 'Unfollow' : 'Follow' }}
          </button>
          
          <button
            v-if="!isOwnProfile"
            :class="[
              'px-6 py-2 rounded-lg font-medium transition-colors',
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            Message
          </button>
        </div>
      </div>
    </div>

    <!-- Content Tabs -->
    <div class="mb-8">
      <div class="border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : darkMode
                  ? 'border-transparent text-gray-400 hover:text-gray-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tab.name }}
            <span :class="[
              'ml-2 py-0.5 px-2 text-xs rounded-full',
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-600'
                : darkMode
                  ? 'bg-gray-700 text-gray-400'
                  : 'bg-gray-100 text-gray-500'
            ]">
              {{ getTabCount(tab.id) }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Tab Content -->
    <div>
      <!-- Posts Tab -->
      <div v-if="activeTab === 'posts'">
        <div v-if="userPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCard 
            v-for="post in userPosts" 
            :key="post._id" 
            :post="post"
            @edit="editPost"
            @delete="deletePost"
          />
        </div>
        
        <div v-else class="text-center py-12">
          <div :class="['mb-4', darkMode ? 'text-gray-500' : 'text-gray-400']">
            <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <h3 :class="['text-xl font-medium mb-2', darkMode ? 'text-white' : 'text-gray-900']">
            No posts yet
          </h3>
        <p :class="['mb-6', darkMode ? 'text-gray-400' : 'text-gray-500']">
        {{ isOwnProfile ? "You haven't published any posts yet." : `${profileUser.username} hasn't published any posts yet.` }}
        </p>
          <router-link 
            v-if="isOwnProfile"
            to="/posts/create" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Create Your First Post
          </router-link>
        </div>
      </div>

      <!-- About Tab -->
      <div v-if="activeTab === 'about'" :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <h3 :class="[
          'text-xl font-semibold mb-4',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          About
        </h3>
        
        <div class="space-y-4">
          <div>
            <label :class="[
              'block text-sm font-medium mb-1',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Username
            </label>
            <p :class="[
              'text-lg',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ profileUser.username }}
            </p>
          </div>
          
          <div>
            <label :class="[
              'block text-sm font-medium mb-1',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Role
            </label>
            <p :class="[
              'text-lg',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ profileUser.role }}
            </p>
          </div>
          
          <div>
            <label :class="[
              'block text-sm font-medium mb-1',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Member Since
            </label>
            <p :class="[
              'text-lg',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ formatDate(profileUser.createdAt) }}
            </p>
          </div>
          
          <div v-if="profileUser.bio">
            <label :class="[
              'block text-sm font-medium mb-1',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Bio
            </label>
            <p :class="[
              'text-lg leading-relaxed',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              {{ profileUser.bio }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else-if="loading" class="max-w-6xl mx-auto text-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    <p :class="['mt-4', darkMode ? 'text-gray-300' : 'text-gray-600']">
      Loading profile...
    </p>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="max-w-6xl mx-auto text-center py-12">
    <div :class="['text-red-500 mb-4', darkMode ? 'text-red-400' : 'text-red-600']">
      <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>
    </div>
    <h3 :class="['text-xl font-medium mb-2', darkMode ? 'text-white' : 'text-gray-900']">
      User Not Found
    </h3>
    <p :class="['mb-6', darkMode ? 'text-gray-400' : 'text-gray-500']">
      {{ error }}
    </p>
    <router-link 
      to="/" 
      class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
    >
      Back to Home
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersAPI } from '../services/api'
import PostCard from '../components/Post/PostCard.vue'

export default {
  name: 'UserProfile',
  components: {
    PostCard
  },
  data() {
    return {
      profileUser: null,
      userPosts: [],
      userStats: {},
      loading: true,
      error: '',
      activeTab: 'posts',
      isFollowing: false,
      tabs: [
        { id: 'posts', name: 'Posts' },
        { id: 'about', name: 'About' }
      ]
    }
  },
  computed: {
    ...mapState(['user', 'darkMode']),
    isOwnProfile() {
      return this.user && this.profileUser && this.user._id === this.profileUser._id
    }
  },
  async mounted() {
    await this.loadUserProfile()
    await this.loadUserPosts()
  },
  methods: {
    async loadUserProfile() {
      this.loading = true
      try {
        const response = await usersAPI.getById(this.$route.params.id)
        this.profileUser = response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'User not found'
      } finally {
        this.loading = false
      }
    },
    async loadUserPosts() {
      try {
        // Implement API call to get user's posts
        // const response = await this.$http.get(`/api/users/${this.$route.params.id}/posts`)
        // this.userPosts = response.data.data
      } catch (error) {
        console.error('Error loading user posts:', error)
      }
    },
    getTabCount(tabId) {
      switch (tabId) {
        case 'posts':
          return this.userPosts.length
        case 'about':
          return 1
        default:
          return 0
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    async toggleFollow() {
      if (!this.user) {
        this.$router.push('/login')
        return
      }

      try {
        // Implement follow/unfollow API call
        // if (this.isFollowing) {
        //   await this.$http.delete(`/api/users/${this.profileUser._id}/follow`)
        // } else {
        //   await this.$http.post(`/api/users/${this.profileUser._id}/follow`)
        // }
        this.isFollowing = !this.isFollowing
      } catch (error) {
        console.error('Error toggling follow:', error)
      }
    },
    editPost(post) {
      this.$router.push(`/posts/${post._id}/edit`)
    },
    async deletePost(post) {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          // Implement delete API call
          // await this.$http.delete(`/api/posts/${post._id}`)
          this.userPosts = this.userPosts.filter(p => p._id !== post._id)
        } catch (error) {
          console.error('Error deleting post:', error)
        }
      }
    }
  }
}
</script>