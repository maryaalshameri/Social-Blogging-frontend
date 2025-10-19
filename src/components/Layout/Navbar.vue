<template>
  <nav :class="[
    'sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300',
    darkMode 
      ? 'bg-gray-900/95 border-gray-700/50' 
      : 'bg-white/95 border-gray-200/50',
    scrolled ? 'shadow-xl' : 'shadow-sm'
  ]">
    <div class="container mx-auto px-4 lg:px-6">
      <div class="flex justify-between items-center h-16 lg:h-20">
        
        <!-- Logo Section -->
        <router-link 
          to="/" 
          class="flex items-center space-x-3 group relative"
        >
          <!-- Animated Logo Container -->
          <div class="relative">
            <div :class="[
              'w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 relative overflow-hidden',
              darkMode 
                ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-lg' 
                : 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-lg'
            ]">
              <!-- Logo Icon -->
              <svg class="w-5 h-5 lg:w-6 lg:h-6 text-white transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3a2 2 0 012-2h2a2 2 0 012 2m-6 5v6m4-3H9"></path>
              </svg>
              
              <!-- Shine Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
            
            <!-- Online Indicator -->
            <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 shadow-lg animate-pulse"></div>
          </div>
          
          <!-- Logo Text -->
          <div class="flex flex-col">
            <span :class="[
              'text-xl lg:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r',
              darkMode 
                ? 'from-blue-400 via-purple-400 to-indigo-300' 
                : 'from-blue-600 via-purple-600 to-indigo-700'
            ]">
              MaryBlog
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400 -mt-1 hidden lg:block">
              Share Your Story
            </span>
          </div>
        </router-link>

        <!-- Navigation Links - Desktop -->
        <div class="hidden lg:flex items-center space-x-1">
          <router-link 
            to="/" 
            :class="[
              'relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group',
              $route.path === '/' 
                ? darkMode 
                  ? 'text-blue-400 bg-blue-900/20' 
                  : 'text-blue-600 bg-blue-50'
                : darkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
            ]"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span>Home</span>
            </span>
          </router-link>
          
          <router-link 
            v-if="isAuthenticated"
            to="/dashboard" 
            :class="[
              'relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group',
              $route.path === '/dashboard' 
                ? darkMode 
                  ? 'text-blue-400 bg-blue-900/20' 
                  : 'text-blue-600 bg-blue-50'
                : darkMode 
                  ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
            ]"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Dashboard</span>
            </span>
          </router-link>
          
          <router-link 
            v-if="isAuthenticated && user?.role !== 'reader'"
            to="/posts/create" 
            :class="[
              'relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group',
              $route.path === '/posts/create' 
                ? darkMode 
                  ? 'text-green-400 bg-green-900/20' 
                  : 'text-green-600 bg-green-50'
                : darkMode 
                  ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800/50' 
                  : 'text-gray-700 hover:text-green-600 hover:bg-gray-100'
            ]"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span>Write</span>
            </span>
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-2 lg:space-x-4">
          
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode"
            :class="[
              'p-2 lg:p-3 rounded-xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden group',
              darkMode 
                ? 'text-yellow-400 hover:bg-gray-800/50' 
                : 'text-gray-600 hover:bg-gray-100'
            ]"
            :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <!-- Background Shine -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            
            <svg v-if="darkMode" class="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>

          <!-- Notification Bell -->
          <NotificationBell v-if="isAuthenticated" />

          <!-- User Menu -->
          <template v-if="isAuthenticated">
            <!-- User Profile with Dropdown -->
            <div class="relative group">
              <button 
                :class="[
                  'flex items-center space-x-3 p-2 rounded-xl transition-all duration-300 transform hover:scale-105',
                  darkMode 
                    ? 'hover:bg-gray-800/50' 
                    : 'hover:bg-gray-100'
                ]"
              >
                <div class="relative">
                  <img 
                    v-if="user?.avatar" 
                    :src="`http://localhost:5000${user.avatar}`"
                    class="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-transparent group-hover:border-blue-400 transition-colors"
                  />
                  <div v-else :class="[
                    'w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-blue-400 transition-colors relative overflow-hidden',
                    darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-600' : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  ]">
                    <span :class="[
                      'text-sm font-bold',
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    ]">
                      {{ user?.username?.charAt(0).toUpperCase() }}
                    </span>
                    
                    <!-- Online Status -->
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                </div>
                
                <div class="hidden lg:flex flex-col items-start">
                  <span :class="[
                    'font-medium text-sm',
                    darkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ user?.username }}
                  </span>
                  <span :class="[
                    'text-xs capitalize',
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">
                    {{ user?.role }}
                  </span>
                </div>
                
                <svg class="w-4 h-4 text-gray-400 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- User Dropdown Menu -->
              <div :class="[
                'absolute right-0 top-full mt-2 w-56 rounded-xl shadow-2xl border transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto',
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              ]">
                <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p :class="[
                    'font-medium',
                    darkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ user?.username }}
                  </p>
                  <p :class="[
                    'text-sm capitalize',
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">
                    {{ user?.role }}
                  </p>
                </div>
                
                <div class="p-2">
                  <router-link 
                    to="/profile" 
                    :class="[
                      'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                      darkMode 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>Profile</span>
                  </router-link>
                  
                  <router-link 
                    to="/settings" 
                    :class="[
                      'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                      darkMode 
                        ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700/50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>Settings</span>
                  </router-link>
                </div>
                
                <div class="p-2 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    @click="logout"
                    :class="[
                      'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left',
                      darkMode 
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' 
                        : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </template>
          
          <!-- Auth Buttons -->
          <template v-else>
            <div class="flex items-center space-x-2 lg:space-x-3">
              <router-link 
                to="/login" 
                :class="[
                  'px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105',
                  darkMode 
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                ]"
              >
                Login
              </router-link>
              <router-link 
                to="/register" 
                :class="[
                  'px-6 py-2 rounded-xl font-medium text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden group',
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                ]"
              >
                <!-- Shine Effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span class="relative">Sign Up</span>
              </router-link>
            </div>
          </template>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu"
            :class="[
              'lg:hidden p-2 rounded-xl transition-colors',
              darkMode 
                ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
            ]"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="mobileMenuOpen"
        :class="[
          'lg:hidden border-t py-4 transition-all duration-300',
          darkMode ? 'border-gray-700' : 'border-gray-200'
        ]"
      >
        <div class="space-y-2">
          <router-link 
            to="/" 
            class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors"
            :class="darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>Home</span>
          </router-link>
          
          <template v-if="isAuthenticated">
            <router-link 
              to="/dashboard" 
              class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors"
              :class="darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'"
              @click="mobileMenuOpen = false"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Dashboard</span>
            </router-link>
            
            <router-link 
              v-if="user?.role !== 'reader'"
              to="/posts/create" 
              class="flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors"
              :class="darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'"
              @click="mobileMenuOpen = false"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <span>Write</span>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import NotificationBell from '../Notification/NotificationBell.vue'

export default {
  name: 'Navbar',
  components: {
    NotificationBell
  },
  data() {
    return {
      scrolled: false,
      mobileMenuOpen: false
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'darkMode'])
  },
  methods: {
    ...mapActions(['logout']),
    ...mapMutations(['TOGGLE_DARK_MODE']),
    
    toggleDarkMode() {
      this.TOGGLE_DARK_MODE()
    },
    
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/')
      this.mobileMenuOpen = false
    },
    
    handleScroll() {
      this.scrolled = window.scrollY > 10
    }
  },
  
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>