<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div :class="['mb-8', darkMode ? 'text-gray-500' : 'text-gray-400']">
        <svg class="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8c0 1.703-.524 3.28-1.416 4.577"/>
        </svg>
      </div>
      
      <h1 :class="[
        'text-6xl font-bold mb-4',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        404
      </h1>
      
      <h2 :class="[
        'text-2xl font-semibold mb-4',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        Page Not Found
      </h2>
      
      <p :class="[
        'text-lg mb-8',
        darkMode ? 'text-gray-300' : 'text-gray-600'
      ]">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <router-link 
          to="/"
          :class="[
            'w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-lg font-medium transition-colors',
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          ]"
        >
          Go Home
        </router-link>
        
        <button 
          @click="$router.go(-1)"
          :class="[
            'w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-lg font-medium transition-colors',
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          ]"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NotFound',
  computed: {
    ...mapState(['darkMode'])
  }
}
</script>