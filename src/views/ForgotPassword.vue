<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"></div>
      <div class="absolute top-1/4 -left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:opacity-20"></div>
      <div class="absolute top-1/3 -right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div>
    </div>

    <!-- Floating Shapes -->
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
          {{ showResetForm ? 'Reset Your Password' : 'Forgot Password' }}
        </h2>
        <p :class="[
          'mt-3 text-lg',
          darkMode ? 'text-gray-300' : 'text-gray-600'
        ]">
          {{ showResetForm ? 'Choose a new strong password' : 'We\'ll send a reset link to your email' }}
        </p>
      </div>

      <!-- Form Container -->
      <div :class="[
        'rounded-2xl p-8 space-y-6 backdrop-blur-sm border transform transition-all duration-300 hover:shadow-xl',
        darkMode 
          ? 'bg-gray-800/70 border-gray-700' 
          : 'bg-white/80 border-gray-200 shadow-lg'
      ]">
        <!-- Error Message -->
        <div v-if="error" class="p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-900/30 dark:border-red-800 flex items-start space-x-3 animate-pulse">
          <svg class="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-sm text-red-600 dark:text-red-400">
            {{ error }}
          </p>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="p-4 rounded-xl bg-green-50 border border-green-200 dark:bg-green-900/30 dark:border-green-800 flex items-start space-x-3 animate-pulse">
          <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-sm text-green-600 dark:text-green-400">
            {{ success }}
          </p>
        </div>

        <!-- Forgot Password Form -->
        <form v-if="!showResetForm" class="space-y-6" @submit.prevent="sendResetLink">
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
                v-model="email"
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
                placeholder="Enter your email address"
                :disabled="loading"
              >
              <div v-if="email && !errors.email" class="absolute right-3 top-1/2 transform -translate-y-1/2">
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
              Sending...
            </span>
            <span v-else class="flex items-center">
              Send Reset Link
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>

          <!-- Back to Login -->
          <div class="text-center">
            <router-link 
              to="/login" 
              :class="[
                'text-sm font-medium transition-colors flex items-center justify-center space-x-2',
                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
              ]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Back to Login</span>
            </router-link>
          </div>
        </form>

        <!-- Reset Password Form -->
        <form v-else class="space-y-6" @submit.prevent="resetPassword">
          <!-- Email Info -->
          <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-800">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <div>
                <p class="text-sm font-medium text-blue-800 dark:text-blue-200">Reset link sent to</p>
                <p class="text-sm text-blue-600 dark:text-blue-300">{{ email }}</p>
              </div>
            </div>
          </div>

          <!-- Reset Token -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
              <label for="token" :class="[
                'block text-sm font-medium',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Reset Code
              </label>
            </div>
            <input
              id="token"
              v-model="token"
              type="text"
              required
              :class="[
                'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300 font-mono text-center',
                errors.token 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                darkMode 
                  ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500'
              ]"
              placeholder="Enter the code sent to your email"
              :disabled="loading"
            >
          </div>

          <!-- New Password -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <label for="newPassword" :class="[
                  'block text-sm font-medium',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  New Password
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
            <input
              id="newPassword"
              v-model="newPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              :class="[
                'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300',
                errors.newPassword 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                darkMode 
                  ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500'
              ]"
              placeholder="Enter your new password"
              :disabled="loading"
              @input="checkPasswordStrength"
            >
            
            <!-- Password Strength Indicator -->
            <div v-if="newPassword" class="mt-3 space-y-2">
              <div class="flex justify-between items-center text-sm">
                <span :class="[
                  'font-medium',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                ]">Password Strength:</span>
                <span :class="passwordStrength.class">{{ passwordStrength.text }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  class="h-2 rounded-full transition-all duration-500" 
                  :class="passwordStrength.barClass"
                  :style="{ width: passwordStrength.percentage + '%' }"
                ></div>
              </div>
              
              <!-- Password Requirements -->
              <div class="grid grid-cols-1 gap-1 mt-2">
                <div v-for="req in passwordRequirements" :key="req.id" class="flex items-center space-x-2 text-xs">
                  <svg 
                    class="w-4 h-4 flex-shrink-0" 
                    :class="req.met ? 'text-green-500' : 'text-gray-400'"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path v-if="req.met" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span :class="[
                    req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  ]">{{ req.text }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <label for="confirmPassword" :class="[
                'block text-sm font-medium',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Confirm Password
              </label>
            </div>
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300',
                  confirmPassword && newPassword !== confirmPassword 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : confirmPassword && newPassword === confirmPassword
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                  darkMode 
                    ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500'
                ]"
                placeholder="Re-enter your new password"
                :disabled="loading"
              >
              <div v-if="confirmPassword" class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg 
                  v-if="newPassword === confirmPassword" 
                  class="w-5 h-5 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <svg 
                  v-else 
                  class="w-5 h-5 text-red-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            <p v-if="confirmPassword && newPassword !== confirmPassword" class="mt-1 text-sm text-red-500 flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Passwords do not match</span>
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button
              type="button"
              @click="showResetForm = false"
              :class="[
                'flex-1 py-3 px-4 rounded-xl text-base font-semibold transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]',
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
              ]"
              :disabled="loading"
            >
              Back
            </button>
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              :class="[
                'flex-1 flex justify-center py-3 px-4 rounded-xl text-base font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]',
                loading || !isFormValid
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
              ]"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </span>
              <span v-else class="flex items-center">
                Reset Password
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { authAPI } from '../services/api'
import ToastService from '@/services/ToastService'

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      token: '',
      newPassword: '',
      confirmPassword: '',
      showPassword: false,
      showResetForm: false,
      loading: false,
      error: '',
      success: '',
      errors: {},
      
      passwordRequirements: [
        { id: 1, text: 'At least 8 characters', met: false, check: (pwd) => pwd.length >= 8 },
        { id: 2, text: 'At least one uppercase letter', met: false, check: (pwd) => /[A-Z]/.test(pwd) },
        { id: 3, text: 'At least one lowercase letter', met: false, check: (pwd) => /[a-z]/.test(pwd) },
        { id: 4, text: 'At least one number', met: false, check: (pwd) => /[0-9]/.test(pwd) },
        { id: 5, text: 'At least one special character', met: false, check: (pwd) => /[^A-Za-z0-9]/.test(pwd) }
      ]
    }
  },
  computed: {
    ...mapState(['darkMode']),
    
    passwordStrength() {
      if (!this.newPassword) {
        return { percentage: 0, text: 'Weak', class: 'text-red-500', barClass: 'bg-red-500' }
      }

      let score = 0
      this.passwordRequirements.forEach(req => {
        if (req.met) score += 20
      })

      if (score <= 20) return { percentage: 20, text: 'Very Weak', class: 'text-red-500', barClass: 'bg-red-500' }
      if (score <= 40) return { percentage: 40, text: 'Weak', class: 'text-orange-500', barClass: 'bg-orange-500' }
      if (score <= 60) return { percentage: 60, text: 'Medium', class: 'text-yellow-500', barClass: 'bg-yellow-500' }
      if (score <= 80) return { percentage: 80, text: 'Good', class: 'text-blue-500', barClass: 'bg-blue-500' }
      return { percentage: 100, text: 'Very Strong', class: 'text-green-500', barClass: 'bg-green-500' }
    },

    isFormValid() {
      return this.token && 
             this.newPassword && 
             this.confirmPassword && 
             this.newPassword === this.confirmPassword &&
             this.passwordStrength.percentage >= 60
    }
  },
  methods: {
    checkPasswordStrength() {
      this.passwordRequirements.forEach(req => {
        req.met = req.check(this.newPassword)
      })
    },
    async sendResetLink() {
  this.loading = true
  this.error = ''
  this.success = ''
  this.errors = {}

  try {
    // التعديل هنا: إرسال البيانات ككائن يحتوي على حقل email
    const response = await authAPI.forgotPassword({ email: this.email })
    
    if (response.data.success) {
      this.success = 'تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني. يرجى التحقق من بريدك.'
      this.showResetForm = true
      ToastService.success('تم إرسال رابط إعادة التعيين بنجاح')
    }
  } catch (error) {
    console.log('Error details:', error.response?.data)
    
    // معالجة الأخطاء المختلفة
    if (error.response?.data?.errors) {
      this.errors = this.formatErrors(error.response.data.errors)
      this.error = Object.values(this.errors)[0] || 'حدث خطأ في التحقق من البيانات'
    } else if (error.response?.data?.message) {
      this.error = error.response.data.message
    } else {
      this.error = 'حدث خطأ أثناء إرسال رابط إعادة التعيين'
    }
    
    ToastService.error(this.error)
  } finally {
    this.loading = false
  }
},
   
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.error = 'Passwords do not match'
        ToastService.error(this.error)
        return
      }

      this.loading = true
      this.error = ''
      this.success = ''
      this.errors = {}

      try {
        const response = await authAPI.resetPassword(this.token, this.newPassword)
        
        if (response.data.success) {
          this.success = 'Password reset successfully! Redirecting to login page...'
          ToastService.success('Password reset successfully')
          
          setTimeout(() => {
            this.$router.push('/login')
          }, 3000)
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          this.errors = this.formatErrors(error.response.data.errors)
        } else {
          this.error = error.response?.data?.message || 'An error occurred while resetting password'
        }
        ToastService.error(this.error)
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
      } else if (typeof errors === 'object') {
        // التعامل مع كائن الأخطاء العادي
        Object.keys(errors).forEach(key => {
          formatted[key] = errors[key]
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