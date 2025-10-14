<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 :class="[
        'text-3xl font-bold mb-4',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        Your Profile
      </h1>
      <p :class="[
        'text-lg',
        darkMode ? 'text-gray-300' : 'text-gray-600'
      ]">
        Manage your account settings and preferences
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Sidebar -->
      <div :class="[
        'lg:col-span-1 space-y-6',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        <!-- Profile Card -->
        <div :class="[
          'rounded-xl p-6 text-center',
          darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
        ]">
          <div class="flex justify-center mb-4">
            <img 
              v-if="user.avatar" 
              :src="user.avatar" 
              class="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
            <div v-else :class="[
              'w-24 h-24 rounded-full flex items-center justify-center border-4 text-2xl font-bold',
              darkMode ? 'bg-gray-700 border-blue-500 text-gray-300' : 'bg-gray-300 border-blue-500 text-gray-600'
            ]">
              {{ user.username?.charAt(0).toUpperCase() }}
            </div>
          </div>
          <h2 class="text-xl font-bold mb-2">{{ user.username }}</h2>
          <p :class="[
            'inline-block px-3 py-1 rounded-full text-sm font-medium',
            darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
          ]">
            {{ user.role }}
          </p>
          <p :class="[
            'mt-4 text-sm',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          ]">
            Member since {{ formatDate(user.createdAt) }}
          </p>
        </div>

        <!-- Stats -->
        <div :class="[
          'rounded-xl p-6',
          darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
        ]">
          <h3 class="font-semibold mb-4">Your Stats</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span :class="[
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              ]">Posts Published</span>
              <span class="font-semibold">{{ userStats.postsCount || 0 }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span :class="[
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              ]">Total Likes</span>
              <span class="font-semibold">{{ userStats.totalLikes || 0 }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span :class="[
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              ]">Comments</span>
              <span class="font-semibold">{{ userStats.commentsCount || 0 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Edit Profile Form -->
        <div :class="[
          'rounded-xl p-6',
          darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
        ]">
          <h3 class="text-xl font-semibold mb-6">Edit Profile</h3>
          
          <form @submit.prevent="updateProfile" class="space-y-6">
            <!-- Avatar Upload -->
            <div>
              <label :class="[
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Profile Picture
              </label>
              <div class="flex items-center space-x-6">
                <div class="flex-shrink-0">
                  <img 
                    v-if="previewAvatar || user.avatar" 
                    :src="previewAvatar || `http://localhost:5000${user.avatar}`" 
                    class="w-16 h-16 rounded-full object-cover"
                  />
                  <div v-else :class="[
                    'w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold',
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-600'
                  ]">
                    {{ user.username?.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <div class="flex-1">
                  <input
                    type="file"
                    ref="avatarInput"
                    accept="image/*"
                    @change="handleAvatarUpload"
                    class="hidden"
                  >
                  <button
                    type="button"
                    @click="$refs.avatarInput.click()"
                    :class="[
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    ]"
                  >
                    Change Photo
                  </button>
                  <p :class="[
                    'mt-1 text-xs',
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">
                    JPG, PNG or GIF. Max 5MB.
                  </p>
                </div>
              </div>
            </div>

            <!-- Username -->
            <div>
              <label for="username" :class="[
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Username
              </label>
              <input
                id="username"
                v-model="editForm.username"
                type="text"
                :class="[
                  'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                ]"
                placeholder="Enter your username"
              >
            </div>

            <!-- Bio -->
            <div>
              <label for="bio" :class="[
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Bio
              </label>
              <textarea
                id="bio"
                v-model="editForm.bio"
                rows="4"
                :class="[
                  'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none',
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                ]"
                placeholder="Tell us about yourself..."
                maxlength="500"
              ></textarea>
              <p :class="[
                'mt-1 text-xs text-right',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                {{ editForm.bio?.length || 0 }}/500
              </p>
            </div>

            <!-- Email (Read-only) -->
            <div>
              <label for="email" :class="[
                'block text-sm font-medium mb-2',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Email Address
              </label>
              <input
                id="email"
                :value="user.email"
                type="email"
                disabled
                :class="[
                  'w-full px-3 py-2 rounded-lg border cursor-not-allowed',
                  darkMode 
                    ? 'bg-gray-900 border-gray-700 text-gray-400' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                ]"
              >
              <p :class="[
                'mt-1 text-xs',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Email cannot be changed
              </p>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
              <p class="text-sm text-red-600 dark:text-red-400">
                {{ error }}
              </p>
            </div>

            <!-- Success Message -->
            <div v-if="success" class="p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
              <p class="text-sm text-green-600 dark:text-green-400">
                {{ success }}
              </p>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                @click="resetForm"
                :class="[
                  'px-6 py-2 rounded-lg font-medium transition-colors',
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading || !hasChanges"
                :class="[
                  'px-6 py-2 rounded-lg font-medium text-white transition-colors',
                  loading || !hasChanges
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                ]"
              >
                <span v-if="loading">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
                <span v-else>
                  Save Changes
                </span>
              </button>
            </div>
          </form>
        </div>

        <!-- Danger Zone -->
        <div :class="[
          'rounded-xl p-6 border-2',
          darkMode ? 'bg-gray-800 border-red-900' : 'bg-white border-red-200'
        ]">
          <h3 class="text-xl font-semibold mb-4 text-red-600">Danger Zone</h3>
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium mb-1">Delete Account</h4>
              <p :class="[
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-600'
              ]">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              @click="confirmDeleteAccount"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-white transition-colors',
                darkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
              ]"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { usersAPI } from '../services/api'

export default {
  name: 'Profile',
  data() {
    return {
      editForm: {
        username: '',
        bio: '',
        avatar: null
      },
      previewAvatar: null,
      loading: false,
      error: '',
      success: '',
      userStats: {}
    }
  },
computed: {
  ...mapState(['user', 'darkMode']),
  hasChanges() {
    return this.editForm.username !== this.user?.username || 
           this.editForm.bio !== (this.user?.bio || '') ||
           this.editForm.avatar !== null
  }
},

async updateProfile() {
  this.loading = true
  this.error = ''
  this.success = ''

  try {
    // التحقق المزدوج من وجود المستخدم
    if (!this.user || !this.user._id) {
      // محاولة إعادة تحميل بيانات المستخدم
      await this.reloadUser()
      if (!this.user || !this.user._id) {
        this.error = 'User session expired. Please log in again.'
        this.loading = false
        return
      }
    }

    const formData = new FormData()
    formData.append('username', this.editForm.username)
    formData.append('bio', this.editForm.bio)
    if (this.editForm.avatar) {
      formData.append('avatar', this.editForm.avatar)
    }

    const response = await usersAPI.update(this.user._id, formData)
    
    if (response.data.success) {
      this.success = 'Profile updated successfully!'
      this.$store.commit('SET_USER', response.data.data)
      this.resetForm()
    }
  } catch (error) {
    console.error('Update profile error:', error)
    this.error = error.response?.data?.message || 'Failed to update profile'
  } finally {
    this.loading = false
  }
},

async reloadUser() {
  try {
    const response = await authAPI.getMe()
    if (response.data.success) {
      this.$store.commit('SET_USER', response.data.data)
    }
  } catch (error) {
    console.error('Failed to reload user:', error)
  }
},
  mounted() {
    this.resetForm()
    this.loadUserStats()
  },
  methods: {
    ...mapActions(['logout']),
    resetForm() {
      this.editForm = {
        username: this.user.username,
        bio: this.user.bio || '',
        avatar: null
      }
      this.previewAvatar = null
      this.error = ''
      this.success = ''
    },
    handleAvatarUpload(event) {
      const file = event.target.files[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          this.error = 'File size must be less than 5MB'
          return
        }
        
        this.editForm.avatar = file
        this.previewAvatar = URL.createObjectURL(file)
        this.error = ''
      }
    },
async updateProfile() {
  this.loading = true
  this.error = ''
  this.success = ''

  try {
    const formData = new FormData()
    formData.append('username', this.editForm.username)
    formData.append('bio', this.editForm.bio)
    if (this.editForm.avatar) {
      formData.append('avatar', this.editForm.avatar)
    }

    // تصحيح: استخدام this.user._id بدلاً من this.user?._id
    if (!this.user || !this.user._id) {
      this.error = 'User ID not found - Please refresh the page'
      this.loading = false
      return
    }

    const response = await usersAPI.update(this.user._id, formData)
    
    if (response.data.success) {
      this.success = 'Profile updated successfully!'
      // Update user in store
      this.$store.commit('SET_USER', response.data.data)
      this.resetForm()
    }
  } catch (error) {
    console.error('Update profile error:', error)
    this.error = error.response?.data?.message || 'Failed to update profile'
    
    if (error.response?.status === 403) {
      this.error = 'You are not authorized to update this profile'
    } else if (error.response?.status === 400) {
      this.error = 'Invalid data provided'
    }
  } finally {
    this.loading = false
  }
},
    async loadUserStats() {
      try {
        // Implement user stats API call
        // const response = await this.$http.get(`/api/users/${this.user._id}/stats`)
        // this.userStats = response.data.data
      } catch (error) {
        console.error('Error loading user stats:', error)
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    },
    confirmDeleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        this.deleteAccount()
      }
    },
    async deleteAccount() {
      try {
        // Implement delete account API call
        // await this.$http.delete(`/api/users/${this.user._id}`)
        await this.logout()
        this.$router.push('/')
      } catch (error) {
        this.error = 'Failed to delete account'
      }
    }
  }
}
</script>