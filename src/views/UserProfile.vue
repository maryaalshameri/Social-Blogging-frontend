<template>
  <div class="min-h-screen" :class="darkMode ? 'bg-gray-900' : 'bg-gray-50'">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-8 h-8 bg-blue-600 rounded-full animate-ping"></div>
          </div>
        </div>
        <p :class="['mt-6 text-lg', darkMode ? 'text-gray-300' : 'text-gray-600']">
          Loading profile...
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center max-w-md">
        <div :class="['text-red-500 mb-6', darkMode ? 'text-red-400' : 'text-red-600']">
          <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h3 :class="['text-2xl font-bold mb-4', darkMode ? 'text-white' : 'text-gray-900']">
          User Not Found
        </h3>
        <p :class="['mb-8 leading-relaxed', darkMode ? 'text-gray-400' : 'text-gray-500']">
          {{ error }}
        </p>
        <div class="flex space-x-4 justify-center">
          <router-link 
            to="/" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg"
          >
            Back to Home
          </router-link>
          <button 
            @click="loadUserProfile"
            class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="profileUser">
      <!-- Header Section -->
      <div class="relative bg-gradient-to-r from-blue-600 to-purple-700 pt-24 pb-16">
        <div class="max-w-6xl mx-auto px-4">
          <!-- Navigation -->
          <div class="flex justify-between items-center mb-8">
            <button 
              @click="$router.go(-1)"
              :class="[
                'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all',
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-100 text-gray-700'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span>Back</span>
            </button>
            
            <div class="flex space-x-3">
              <button
                v-if="isOwnProfile"
                @click="$router.push('/profile')"
                :class="[
                  'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all',
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                <span>Edit Profile</span>
              </button>
              
              <button
                v-if="!isOwnProfile"
                @click="toggleFollow"
                :class="[
                  'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white transition-all ml-6',
                  isFollowing
                    ? 'bg-red-500 hover:bg-red-600 shadow-lg'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-blue-600 shadow-lg'
                ]"
              >
                <svg v-if="!isFollowing" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>
                </svg>
                <span>{{ isFollowing ? 'Unfollow' : 'Follow' }}</span>
              </button>
            </div>
          </div>

          <!-- Profile Header Content -->
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <!-- Avatar -->
            <div class="relative">
              <div class="relative rounded-full p-1" :class="darkMode ? 'bg-gray-800' : 'bg-white'">
                <div class="relative rounded-full overflow-hidden">
                  <img 
                    v-if="profileUser.avatar" 
                    :src="`http://localhost:5000${profileUser.avatar}`" 
                    class="w-32 h-32 md:w-40 md:h-40 object-cover"
                  />
                  <div v-else :class="[
                    'w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center text-5xl font-bold',
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-600'
                  ]">
                    {{ profileUser.username?.charAt(0).toUpperCase() }}
                  </div>
                </div>
                
                <!-- Online Status Badge -->
                <div class="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2" 
                     :class="darkMode ? 'border-gray-800 bg-green-500' : 'border-white bg-green-500'">
                </div>
              </div>
            </div>

            <!-- User Info -->
            <div class="flex-1 text-center md:text-left">
              <div class="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                <h1 :class="[
                  'text-3xl md:text-4xl font-bold',
                  darkMode ? 'text-white' : 'text-white'
                ]">
                  {{ profileUser.username }}
                </h1>
                
                <div :class="[
                  'inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium',
                  darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-500 bg-opacity-20 text-blue-100'
                ]">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ profileUser.role }}</span>
                </div>
              </div>

              <!-- Bio -->
              <p 
                v-if="profileUser.bio"
                :class="[
                  'text-lg max-w-2xl mb-6',
                  darkMode ? 'text-blue-100' : 'text-blue-50'
                ]"
              >
                {{ profileUser.bio }}
              </p>

              <!-- Stats -->
              <div class="flex justify-center md:justify-start space-x-8">
                <div class="text-center">
                  <div :class="[
                    'text-2xl font-bold mb-1',
                    darkMode ? 'text-white' : 'text-white'
                  ]">
                    {{ userStats.postsCount || 0 }}
                  </div>
                  <div :class="[
                    'text-sm',
                    darkMode ? 'text-blue-200' : 'text-blue-100'
                  ]">
                    Posts
                  </div>
                </div>
                <div class="text-center">
                  <div :class="[
                    'text-2xl font-bold mb-1',
                    darkMode ? 'text-white' : 'text-white'
                  ]">
                    {{ userStats.followersCount || 0 }}
                  </div>
                  <div :class="[
                    'text-sm',
                    darkMode ? 'text-blue-200' : 'text-blue-100'
                  ]">
                    Followers
                  </div>
                </div>
                <div class="text-center">
                  <div :class="[
                    'text-2xl font-bold mb-1',
                    darkMode ? 'text-white' : 'text-white'
                  ]">
                    {{ userStats.followingCount || 0 }}
                  </div>
                  <div :class="[
                    'text-sm',
                    darkMode ? 'text-blue-200' : 'text-blue-100'
                  ]">
                    Following
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <!-- Content Card -->
        <div :class="[
          'rounded-2xl overflow-hidden shadow-xl',
          darkMode ? 'bg-gray-800' : 'bg-white'
        ]">
          <!-- Content Tabs -->
          <div class="border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
            <nav class="flex">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'flex-1 py-5 px-1 text-center font-medium text-sm transition-all relative',
                  activeTab === tab.id
                    ? darkMode 
                      ? 'text-blue-400' 
                      : 'text-blue-600'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                ]"
              >
                <div class="flex items-center justify-center space-x-2">
                  <span>{{ tab.name }}</span>
                  <span :class="[
                    'py-0.5 px-2 text-xs rounded-full',
                    activeTab === tab.id
                      ? darkMode
                        ? 'bg-blue-900 text-blue-300'
                        : 'bg-blue-100 text-blue-600'
                      : darkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-100 text-gray-500'
                  ]">
                    {{ getTabCount(tab.id) }}
                  </span>
                </div>
                
                <!-- Active Tab Indicator -->
                <div 
                  v-if="activeTab === tab.id"
                  :class="[
                    'absolute bottom-0 left-0 right-0 h-0.5',
                    darkMode ? 'bg-blue-400' : 'bg-blue-600'
                  ]"
                ></div>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
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
                <div :class="['mb-6', darkMode ? 'text-gray-600' : 'text-gray-400']">
                  <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
                <h3 :class="['text-xl font-semibold mb-2', darkMode ? 'text-white' : 'text-gray-900']">
                  No posts yet
                </h3>
                <p :class="['mb-6 max-w-md mx-auto', darkMode ? 'text-gray-400' : 'text-gray-500']">
                  {{ isOwnProfile ? "You haven't published any posts yet. Share your thoughts with the world!" : `${profileUser.username} hasn't published any posts yet.` }}
                </p>
                <router-link 
                  v-if="isOwnProfile"
                  to="/posts/create" 
                  class="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span>Create Your First Post</span>
                </router-link>
              </div>
            </div>

            <!-- About Tab -->
            <div v-if="activeTab === 'about'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Personal Information -->
                <div>
                  <h3 :class="[
                    'text-xl font-semibold mb-6 pb-2 border-b',
                    darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
                  ]">
                    Personal Information
                  </h3>
                  
                  <div class="space-y-6">
                    <div class="flex items-start space-x-4">
                      <div :class="[
                        'p-3 rounded-xl',
                        darkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'
                      ]">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <div>
                        <label :class="[
                          'block text-sm font-medium mb-1',
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        ]">
                          Username
                        </label>
                        <p :class="[
                          'text-lg font-medium',
                          darkMode ? 'text-white' : 'text-gray-900'
                        ]">
                          {{ profileUser.username }}
                        </p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div :class="[
                        'p-3 rounded-xl',
                        darkMode ? 'bg-gray-700 text-green-400' : 'bg-green-100 text-green-600'
                      ]">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <label :class="[
                          'block text-sm font-medium mb-1',
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        ]">
                          Role
                        </label>
                        <p :class="[
                          'text-lg font-medium',
                          darkMode ? 'text-white' : 'text-gray-900'
                        ]">
                          {{ profileUser.role }}
                        </p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div :class="[
                        'p-3 rounded-xl',
                        darkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-100 text-purple-600'
                      ]">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <label :class="[
                          'block text-sm font-medium mb-1',
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        ]">
                          Member Since
                        </label>
                        <p :class="[
                          'text-lg font-medium',
                          darkMode ? 'text-white' : 'text-gray-900'
                        ]">
                          {{ formatDate(profileUser.createdAt) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bio Section -->
                <div v-if="profileUser.bio">
                  <h3 :class="[
                    'text-xl font-semibold mb-6 pb-2 border-b',
                    darkMode ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'
                  ]">
                    About Me
                  </h3>
                  
                  <div class="flex items-start space-x-4">
                    <div :class="[
                      'p-3 rounded-xl',
                      darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                    ]">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <div class="flex-1">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersAPI, postsAPI } from '../services/api'
import PostCard from '../components/Post/PostCard.vue'
import toastService from '@/services/ToastService'
import socketService from '@/services/socket'

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
    if (this.profileUser) {
      await Promise.all([
        this.loadUserPosts(),
        this.loadUserStats(),
        this.checkFollowStatus()
      ]);
      
      // إعداد مستمعي الأحداث في الوقت الحقيقي
      this.setupSocketListeners()
    }
  },
  beforeDestroy() {
    // تنظيف مستمعي الأحداث عند تدمير المكون
    this.cleanupSocketListeners()
  },
  watch: {
  '$route.params.id': {
    handler(newId, oldId) {
      if (newId !== oldId) {
        this.reloadProfile();
      }
    },
    immediate: true
  }
},
  methods: {
    async reloadProfile() {
    await this.loadUserProfile();
    if (this.profileUser) {
      await Promise.all([
        this.loadUserPosts(),
        this.loadUserStats(),
        this.checkFollowStatus()
      ]);
      if (this.user && socketService.socket) {
      socketService.joinUserRoom(this.user._id);
    }
      // تنظيف وإعادة إعداد المستمعين
      this.cleanupSocketListeners();
      this.setupSocketListeners();
    }
  },
    async loadUserProfile() {
      this.loading = true
      this.error = ''
      try {
        const response = await usersAPI.getById(this.$route.params.id)
        this.profileUser = response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'User not found'
        console.error('Error loading user profile:', error)
      } finally {
        this.loading = false
      }
    },
    async loadUserPosts() {
      try {
        const response = await postsAPI.getAll({
          author: this.$route.params.id,
          status: 'published',
          limit: 100
        });
        this.userPosts = response.data.data;
      } catch (error) {
        console.error('Error loading user posts:', error);
        this.userPosts = [];
      }
    },
    async loadUserStats() {
      try {
        const response = await usersAPI.getStats(this.$route.params.id);
        this.userStats = response.data.data;
      } catch (error) {
        console.error('Error loading user stats:', error);
        this.userStats = {
          postsCount: 0,
          followersCount: 0,
          followingCount: 0
        };
      }
    },
    async checkFollowStatus() {
      if (!this.user || this.isOwnProfile) return;
      
      try {
        const response = await usersAPI.getFollowStatus(this.$route.params.id);
        this.isFollowing = response.data.data.isFollowing;
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    },
// في الـ methods في Vue component
async toggleFollow() {
  if (!this.user) {
    this.$router.push('/login');
    return;
  }

  try {
    if (this.isFollowing) {
      const response = await usersAPI.unfollow(this.profileUser._id);
      this.isFollowing = false;
      // استخدام البيانات من الاستجابة بدلاً من الاعتماد على السوكيت فقط
      this.userStats.followersCount = response.data.data.followersCount;
      
      // إرسال حدث unfollow عبر Socket
      if (socketService.socket && socketService.getConnectionStatus()) {
        socketService.unfollowUser(this.profileUser._id, this.user._id);
      }
      
      toastService.success(`Unfollowed ${this.profileUser.username}`);
    } else {
      const response = await usersAPI.follow(this.profileUser._id);
      this.isFollowing = true;
      // استخدام البيانات من الاستجابة بدلاً من الاعتماد على السوكيت فقط
      this.userStats.followersCount = response.data.data.followersCount;
      
      // إرسال حدث follow عبر Socket
      if (socketService.socket && socketService.getConnectionStatus()) {
        socketService.followUser(this.profileUser._id, this.user._id);
      }
      
      toastService.success(`Following ${this.profileUser.username}`);
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
    const errorMessage = error.response?.data?.message || 'An error occurred';
    toastService.error(errorMessage);
  }
},
    
    // إعداد مستمعي أحداث Socket.io
    setupSocketListeners() {
      // حدث عندما يتابع أحد المستخدم الحالي
      window.addEventListener('socket-userFollowed', this.handleUserFollowed);
      window.addEventListener('socket-userUnfollowed', this.handleUserUnfollowed);
      window.addEventListener('socket-newFollower', this.handleNewFollower);
      window.addEventListener('socket-followStatsUpdate', this.handleFollowStatsUpdate);

    },
    
    // تنظيف مستمعي الأحداث
    cleanupSocketListeners() {
      window.removeEventListener('socket-userFollowed', this.handleUserFollowed);
      window.removeEventListener('socket-userUnfollowed', this.handleUserUnfollowed);
      window.removeEventListener('socket-newFollower', this.handleNewFollower);  
      window.removeEventListener('socket-followStatsUpdate', this.handleFollowStatsUpdate);


    },
    
    // معالجة حدث المتابعة
    handleUserFollowed(event) {
      const data = event.detail;
      
      // إذا كان المستخدم الحالي هو من تمت متابعته
      if (data.targetUserId === this.profileUser?._id) {
        this.userStats.followersCount = (this.userStats.followersCount || 0) + 1;
        
        // إذا كان المستخدم الحالي هو من قام بالمتابعة، تحديث حالة المتابعة
        if (data.followerId === this.user?._id) {
          this.isFollowing = true;
        }
        
        console.log('Real-time: User followed - followers count updated');
      }
    },
    
    // معالجة حدث إلغاء المتابعة
    handleUserUnfollowed(event) {
      const data = event.detail;
      
      // إذا كان المستخدم الحالي هو من تم إلغاء متابعته
      if (data.targetUserId === this.profileUser?._id) {
        this.userStats.followersCount = Math.max(0, (this.userStats.followersCount || 1) - 1);
        
        // إذا كان المستخدم الحالي هو من قام بإلغاء المتابعة، تحديث حالة المتابعة
        if (data.followerId === this.user?._id) {
          this.isFollowing = false;
        }
        
        console.log('Real-time: User unfollowed - followers count updated');
      }
    },
    
    // معالجة حدث متابع جديد (للمستخدم الحالي)
    handleNewFollower(event) {
      const data = event.detail;
      
      // إذا كان المستخدم الحالي هو من حصل على متابع جديد
      if (data.targetUserId === this.user?._id) {
        // يمكنك إضافة منطق إضافي هنا إذا كنت تريد تحديث إحصائيات المتابعين للمستخدم الحالي
        console.log('Real-time: You have a new follower');
      }
    },
    // في الـ methods في Vue component
handleFollowStatsUpdate(event) {
  const data = event.detail;
  
  // إذا كانت الإحصائيات للمستخدم المعروض حالياً
  if (data.userId === this.profileUser?._id) {
    this.userStats.followersCount = data.followersCount;
    this.userStats.followingCount = data.followingCount;
    console.log('Real-time: Follow stats updated for profile user');
  }
  
  // إذا كانت الإحصائيات للمستخدم الحالي (المتابِع)
  if (data.userId === this.user?._id) {
    // يمكنك تحديث إحصائيات المستخدم الحالي إذا كنت تعرضها
    console.log('Real-time: Follow stats updated for current user');
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
    editPost(post) {
      this.$router.push(`/posts/${post._id}/edit`)
    },
    async deletePost(post) {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          await postsAPI.delete(post._id)
          this.userPosts = this.userPosts.filter(p => p._id !== post._id)
          toastService.success('Post deleted successfully');
        } catch (error) {
          console.error('Error deleting post:', error)
          toastService.error('Failed to delete post');
        }
      }
    }
  }
}
</script>