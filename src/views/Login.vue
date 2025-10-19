<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- خلفية متحركة -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"></div>
      <div class="absolute top-1/4 -left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:opacity-20"></div>
      <div class="absolute top-1/3 -right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div>
    </div>

    <!-- الشكل الهندسي العائم -->
    <div class="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 animate-pulse"></div>
    <div class="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 animate-pulse animation-delay-1000"></div>

    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center space-x-3 group">
          <div class="relative">
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12',
              darkMode 
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg' 
                : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg'
            ]">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3a2 2 0 012-2h2a2 2 0 012 2m-6 5v6m4-3H9"></path>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 animate-ping"></div>
          </div>
          <span :class="[
            'text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r',
            darkMode ? 'from-blue-400 to-indigo-300' : 'from-blue-600 to-indigo-700'
          ]">MaryBlog</span>
        </router-link>
        <h2 :class="[
          'mt-8 text-3xl font-bold',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          Welcome Back
        </h2>
        <p :class="[
          'mt-3 text-lg',
          darkMode ? 'text-gray-300' : 'text-gray-600'
        ]">
          Sign in to continue your journey
        </p>
      </div>

      <!-- Login Form -->
      <div :class="[
        'rounded-2xl p-8 space-y-6 backdrop-blur-sm border transform transition-all duration-300 hover:shadow-xl',
        darkMode 
          ? 'bg-gray-800/70 border-gray-700' 
          : 'bg-white/80 border-gray-200 shadow-lg'
      ]">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <!-- Email -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
              </svg>
              <label for="email" :class="[
                'block text-sm font-medium',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Email Address
              </label>
            </div>
            <div class="relative">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300',
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                  darkMode 
                    ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500'
                ]"
                placeholder="you@example.com"
                :disabled="loading"
              >
              <div v-if="form.email && !errors.email" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-500 flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ errors.email }}</span>
            </p>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <label for="password" :class="[
                  'block text-sm font-medium',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  Password
                </label>
              </div>
              <button
                type="button"
                @click="showPassword = !showPassword"
                :class="[
                  'text-sm transition-colors flex items-center space-x-1',
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                ]"
              >
                <span>{{ showPassword ? 'Hide' : 'Show' }}</span>
                <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              </button>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300',
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                  darkMode 
                    ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500'
                ]"
                placeholder="Enter your password"
                :disabled="loading"
              >
              <div v-if="form.password && !errors.password" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-500 flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ errors.password }}</span>
            </p>
          </div>

          <!-- Remember me & Forgot password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="remember-me" :class="[
                'ml-2 block text-sm',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <router-link 
                to="/forgot-password" 
                :class="[
                  'font-medium transition-colors',
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                ]"
              >
                Forgot your password?
              </router-link>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-900/30 dark:border-red-800 flex items-start space-x-3 animate-pulse">
            <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-sm text-red-600 dark:text-red-400">
              {{ error }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            :class="[
              'w-full flex justify-center py-4 px-4 rounded-xl text-base font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]',
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl'
            ]"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else class="flex items-center">
              Sign in
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span :class="[
              'px-2 bg-white dark:bg-gray-800 text-gray-500'
            ]">Or continue with</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            :class="[
              'w-full inline-flex justify-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] border',
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
            ]"
          >
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button
            type="button"
            :class="[
              'w-full inline-flex justify-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] border',
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
            ]"
          >
            <svg class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
            </svg>
          </button>
        </div>

        <!-- Register Link -->
        <div class="text-center">
          <p :class="[
            'text-sm',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          ]">
            Don't have an account?
            <router-link 
              to="/register" 
              :class="[
                'font-semibold transition-colors',
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              ]"
            >
              Sign up now
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { authAPI } from '../services/api'
import ToastService from '@/services/ToastService'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      showPassword: false,
      loading: false,
      error: '',
      errors: {}
    }
  },
  computed: {
    ...mapState(['darkMode'])
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      this.loading = true
      this.error = ''
      this.errors = {}

      try {
        const response = await authAPI.login(this.form)
        
        if (response.data.success) {
          await this.login({
            user: response.data.data.user,
            token: response.data.data.token
          })
          
          this.$router.push('/')
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          this.errors = this.formatErrors(error.response.data.errors)
          ToastService.error(this.errors)

        } else {
          this.error = error.response?.data?.message || 'Login failed. Please try again.'
          ToastService.error(this.error)
        }
      } finally {
        this.loading = false
      }
    },
    formatErrors(errors) {
      const formatted = {}
      if (Array.isArray(errors)) {
        errors.forEach(error => {
          if (error.path) {
            formatted[error.path] = error.msg
          }
        })
      }
      return formatted
    }
  }
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>