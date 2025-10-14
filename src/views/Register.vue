<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- خلفية متحركة -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"></div>
      <div class="absolute top-1/4 -left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob dark:opacity-20"></div>
      <div class="absolute top-1/3 -right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 dark:opacity-20"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 dark:opacity-20"></div>
    </div>

    <!-- الشكل الهندسي العائم -->
    <div class="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 opacity-20 animate-pulse"></div>
    <div class="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-20 animate-pulse animation-delay-1000"></div>

    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center space-x-3 group">
          <div class="relative">
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12',
              darkMode 
                ? 'bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg' 
                : 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg'
            ]">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3a2 2 0 012-2h2a2 2 0 012 2m-6 5v6m4-3H9"></path>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 animate-ping"></div>
          </div>
          <span :class="[
            'text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r',
            darkMode ? 'from-purple-400 to-indigo-300' : 'from-purple-600 to-indigo-700'
          ]">BlogHub</span>
        </router-link>
        <h2 :class="[
          'mt-8 text-3xl font-bold',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          Join Our Community
        </h2>
        <p :class="[
          'mt-3 text-lg',
          darkMode ? 'text-gray-300' : 'text-gray-600'
        ]">
          Start your writing journey today
        </p>
      </div>

      <!-- Registration Form -->
      <div :class="[
        'rounded-2xl p-8 space-y-6 backdrop-blur-sm border transform transition-all duration-300 hover:shadow-xl',
        darkMode 
          ? 'bg-gray-800/70 border-gray-700' 
          : 'bg-white/80 border-gray-200 shadow-lg'
      ]">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <!-- Username -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <label for="username" :class="[
                'block text-sm font-medium',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Username
              </label>
            </div>
            <div class="relative">
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300',
                  errors.username 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
                  darkMode 
                    ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500'
                ]"
                placeholder="Choose a unique username"
                :disabled="loading"
              >
              <div v-if="form.username && !errors.username" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <p v-if="errors.username" class="mt-1 text-sm text-red-500 flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ errors.username }}</span>
            </p>
          </div>

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
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
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

          <!-- Role -->
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
              </svg>
              <label for="role" :class="[
                'block text-sm font-medium',
                darkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                I want to be a
              </label>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="form.role = 'reader'"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                  form.role === 'reader'
                    ? darkMode 
                      ? 'border-purple-500 bg-purple-900/30' 
                      : 'border-purple-500 bg-purple-50'
                    : darkMode 
                      ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                ]"
              >
                <div class="flex items-center space-x-3">
                  <div :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                    form.role === 'reader'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-400'
                  ]">
                    <svg v-if="form.role === 'reader'" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p :class="[
                      'font-medium',
                      darkMode ? 'text-white' : 'text-gray-900'
                    ]">Reader</p>
                    <p class="text-xs text-gray-500 mt-1">Read and explore content</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                @click="form.role = 'author'"
                :class="[
                  'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                  form.role === 'author'
                    ? darkMode 
                      ? 'border-purple-500 bg-purple-900/30' 
                      : 'border-purple-500 bg-purple-50'
                    : darkMode 
                      ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                ]"
              >
                <div class="flex items-center space-x-3">
                  <div :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                    form.role === 'author'
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-400'
                  ]">
                    <svg v-if="form.role === 'author'" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p :class="[
                      'font-medium',
                      darkMode ? 'text-white' : 'text-gray-900'
                    ]">Author</p>
                    <p class="text-xs text-gray-500 mt-1">Create and publish posts</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-3">
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
                  darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
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
                @input="checkPasswordStrength"
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300',
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : passwordStrength.score > 2 
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : passwordStrength.score > 1
                        ? 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500'
                        : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
                  darkMode 
                    ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500'
                ]"
                placeholder="Create a strong password"
                :disabled="loading"
              >
              <div v-if="form.password" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div :class="[
                  'w-3 h-3 rounded-full animate-pulse',
                  passwordStrength.score >= 3 ? 'bg-green-500' :
                  passwordStrength.score >= 2 ? 'bg-yellow-500' :
                  passwordStrength.score >= 1 ? 'bg-orange-500' : 'bg-red-500'
                ]"></div>
              </div>
            </div>

            <!-- Password Strength Meter -->
            <div v-if="form.password" class="space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span :class="[
                  'font-medium',
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                ]">Password strength</span>
                <span :class="[
                  'font-bold',
                  passwordStrength.score >= 3 ? 'text-green-600' :
                  passwordStrength.score >= 2 ? 'text-yellow-600' :
                  passwordStrength.score >= 1 ? 'text-orange-600' : 'text-red-600'
                ]">{{ passwordStrength.label }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div :class="[
                  'h-2 rounded-full transition-all duration-500',
                  passwordStrength.score >= 3 ? 'bg-green-500 w-full' :
                  passwordStrength.score >= 2 ? 'bg-yellow-500 w-3/4' :
                  passwordStrength.score >= 1 ? 'bg-orange-500 w-1/2' : 'bg-red-500 w-1/4'
                ]"></div>
              </div>
              
              <!-- Password Requirements -->
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div v-for="(req, index) in passwordRequirements" :key="index" class="flex items-center space-x-2">
                  <div :class="[
                    'w-4 h-4 rounded-full flex items-center justify-center text-white text-xs',
                    req.met ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  ]">
                    <svg v-if="req.met" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span :class="[
                    req.met 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  ]">{{ req.text }}</span>
                </div>
              </div>
            </div>

            <p v-if="errors.password" class="mt-1 text-sm text-red-500 flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ errors.password }}</span>
            </p>
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
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-opacity-50 transition-all duration-300',
                  errors.confirmPassword 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : form.confirmPassword && passwordsMatch
                      ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500',
                  darkMode 
                    ? 'bg-gray-700/50 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500'
                ]"
                placeholder="Confirm your password"
                :disabled="loading"
              >
              <div v-if="form.confirmPassword" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div v-if="passwordsMatch" class="w-5 h-5 text-green-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div v-else class="w-5 h-5 text-red-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-500 flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ errors.confirmPassword }}</span>
            </p>
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
            :disabled="loading || !passwordsMatch || passwordStrength.score < 2"
            :class="[
              'w-full flex justify-center py-4 px-4 rounded-xl text-base font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]',
              loading || !passwordsMatch || passwordStrength.score < 2
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg hover:shadow-xl'
            ]"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
            <span v-else class="flex items-center">
              Create Account
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p :class="[
            'text-sm',
            darkMode ? 'text-gray-400' : 'text-gray-600'
          ]">
            Already have an account?
            <router-link 
              to="/login" 
              :class="[
                'font-semibold transition-colors',
                darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
              ]"
            >
              Sign in here
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
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'reader'
      },
      showPassword: false,
      loading: false,
      error: '',
      errors: {},
      passwordStrength: {
        score: 0,
        label: 'Very Weak'
      }
    }
  },
  computed: {
    ...mapState(['darkMode']),
    passwordsMatch() {
      return this.form.password === this.form.confirmPassword && this.form.password.length >= 6
    },
    passwordRequirements() {
      return [
        { text: '6+ characters', met: this.form.password.length >= 6 },
        { text: 'Uppercase letter', met: /[A-Z]/.test(this.form.password) },
        { text: 'Lowercase letter', met: /[a-z]/.test(this.form.password) },
        { text: 'Number (0-9)', met: /[0-9]/.test(this.form.password) },
        { text: 'Special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(this.form.password) },
        { text: 'No spaces', met: !/\s/.test(this.form.password) }
      ]
    }
  },
  methods: {
    ...mapActions(['login']),
    checkPasswordStrength() {
      let score = 0
      
      // Length check
      if (this.form.password.length >= 6) score++
      if (this.form.password.length >= 8) score++
      
      // Character variety checks
      if (/[A-Z]/.test(this.form.password)) score++
      if (/[a-z]/.test(this.form.password)) score++
      if (/[0-9]/.test(this.form.password)) score++
      if (/[!@#$%^&*(),.?":{}|<>]/.test(this.form.password)) score++
      
      // Cap the score
      score = Math.min(score, 4)
      
      this.passwordStrength.score = score
      
      // Set label based on score
      const labels = ['Very Weak', 'Weak', 'Good', 'Strong', 'Very Strong']
      this.passwordStrength.label = labels[score]
    },
    async handleRegister() {
      this.loading = true
      this.error = ''
      this.errors = {}

      // Client-side validation
      if (!this.passwordsMatch) {
        this.errors.confirmPassword = 'Passwords do not match'
        this.loading = false
        return
      }

      if (this.passwordStrength.score < 2) {
        this.errors.password = 'Please choose a stronger password'
        this.loading = false
        return
      }

      try {
        const { confirmPassword, ...registerData } = this.form
        const response = await authAPI.register(registerData)
        
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
          this.error = error.response?.data?.message || 'Registration failed. Please try again.'
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