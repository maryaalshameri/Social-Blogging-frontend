<!-- views/VerifyEmail.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Verify Your Email
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          We've sent a verification link to your email address
        </p>
      </div>

      <div class="bg-white py-8 px-4 shadow rounded-lg">
        <div v-if="status === 'success'" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                Email verified successfully!!
              </p>
            </div>
          </div>
          <div class="mt-4">
            <router-link 
              to="/login" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Proceed to Login
            </router-link>
          </div>
        </div>

        <div v-else-if="status === 'verifying'" class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p class="mt-4 text-sm text-gray-600">Verifying your email...</p>
        </div>

        <div v-else>
          <div class="rounded-md bg-blue-50 p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-blue-700">
                  Check your email for the verification link. If you didn't receive it, you can resend.
                </p>
              </div>
            </div>
          </div>

          <form @submit.prevent="resendVerification" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter your email"
              >
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Sending...</span>
              <span v-else>Resend Verification Email</span>
            </button>
          </form>

          <div v-if="message" class="mt-4 rounded-md p-4" :class="messageType === 'error' ? 'bg-red-50' : 'bg-green-50'">
            <p :class="messageType === 'error' ? 'text-red-800' : 'text-green-800'">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authAPI } from '@/services/api'
import toastService from '@/services/ToastService'
export default {
  name: 'VerifyEmail',
  data() {
    return {
      email: '',
      loading: false,
      status: '', // 'verifying', 'success', 'error'
      message: '',
      messageType: '' // 'success', 'error'
    }
  },
  mounted() {
    // التحقق من الرمز إذا كان موجود في URL
    const token = this.$route.query.token
    if (token) {
      this.verifyEmail(token)
    }
  },
  methods: {
    async verifyEmail(token) {
      this.status = 'verifying'
      try {
        await authAPI.verifyEmail(token)
        this.status = 'success'
      } catch (error) {
        this.status = 'error'
        this.message = error.response?.data?.message || 'Failed to verify email'
        this.messageType = 'error'
      }
    },
    async resendVerification() {
      this.loading = true
      this.message = ''
      try {
        await authAPI.resendVerification(this.email)
        this.message = 'Verification email sent successfully!'
        this.messageType = 'success'
        toastService.success('Verification email sent successfully!!')
      } catch (error) {
        this.message = error.response?.data?.message || 'Failed to send verification email'
        this.messageType = 'error'
        toastService.error('Failed to send verification email.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>