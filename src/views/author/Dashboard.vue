<template>
  <div class="min-h-screen" :class="darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'">
    <!-- Floating Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Header with Glass Effect -->
     <!-- Welcome Header الجديد - بديل مذهل -->
<div class="mb-8" v-if="user">
  <div :class="[
    'relative rounded-3xl p-8 mb-6 overflow-hidden transform transition-all duration-700 hover:scale-[1.02] group',
    darkMode 
      ? 'bg-gradient-to-br from-gray-800/90 via-purple-900/60 to-blue-900/70 border border-gray-700/50 shadow-2xl' 
      : 'bg-gradient-to-br from-white/90 via-purple-50/70 to-blue-50/80 border border-white/30 shadow-2xl'
  ]">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating Particles -->
      <div class="absolute top-6 left-16 w-4 h-4 bg-blue-400/20 rounded-full animate-float" style="animation-delay: 0s;"></div>
      <div class="absolute top-16 right-24 w-3 h-3 bg-purple-400/20 rounded-full animate-float" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-12 left-24 w-5 h-5 bg-cyan-400/15 rounded-full animate-float" style="animation-delay: 2s;"></div>
      
      <!-- Gradient Orbs -->
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
      <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
      
      <!-- Animated Grid Pattern -->
      <!-- <div class="absolute inset-0 opacity-[0.02]">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"%23000\" cx=\"30\" cy=\"30\" r=\"1\"/></g></svg>');"></div>
      </div>-->
    </div> 

    <div class="relative z-10">
      <div class="flex items-center justify-between">
        <!-- User Info Section -->
        <div class="flex items-center space-x-6">
          <!-- Enhanced Avatar with Creative Design -->
          <div class="relative">
            <div class="relative">
              <!-- Main Avatar Container -->
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 relative overflow-hidden">
                <!-- Avatar Content -->
                <span class="relative z-10">{{ user.username?.charAt(0).toUpperCase() }}</span>
                
                <!-- Shine Effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              
              <!-- Author Badge -->
              <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>

              <!-- Decorative Corner Elements -->
              <div class="absolute -top-2 -left-2 w-6 h-6 border-2 border-blue-300/50 rounded-lg animate-ping"></div>
              <div class="absolute -bottom-2 -left-2 w-4 h-4 border-2 border-purple-300/50 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <!-- Welcome Text with Creative Typography -->
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-3">
              <h1 :class="[
                'text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
                darkMode 
                  ? 'from-blue-400 via-purple-400 to-cyan-400' 
                  : 'from-blue-600 via-purple-600 to-cyan-600'
              ]">
                Welcome back, {{ user.username }}! 
              </h1>
              <div class="text-3xl animate-bounce" style="animation-delay: 0.3s;">✍️</div>
            </div>
            
            <p :class="[
              'text-xl font-medium mb-4',
              darkMode ? 'text-gray-300' : 'text-gray-600'
            ]">
              Ready to create something 
              <span class="relative inline-block">
                <span :class="[
                  'font-bold bg-gradient-to-r bg-clip-text text-transparent',
                  darkMode 
                    ? 'from-yellow-400 to-orange-400' 
                    : 'from-orange-500 to-red-500'
                ]">
                  amazing
                </span>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
              </span> 
              today?
            </p>

            <!-- Author Stats -->
            <div class="flex items-center space-x-6">
              <div class="flex items-center space-x-2" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-sm font-medium">Active Writer</span>
              </div>
              <div class="flex items-center space-x-2" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                <span class="text-sm font-medium">{{ stats.totalPosts || 0 }} Stories Published</span>
              </div>
              <div class="flex items-center space-x-2" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <span class="text-sm font-medium">{{ stats.totalViews || 0 }} Total Views</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date & Quick Actions -->
        <div class="text-right space-y-4">
          <!-- Creative Date Card -->
          <div :class="[
            'inline-flex flex-col items-center p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-105',
            darkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-white/30'
          ]">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-2">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <p :class="[
              'text-sm font-semibold uppercase tracking-wider mb-1',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Today is
            </p>
            <p :class="[
              'text-xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ currentDate }}
            </p>
            <p :class="[
              'text-sm font-medium mt-1',
              darkMode ? 'text-gray-500' : 'text-gray-400'
            ]">
              {{ currentTime }}
            </p>
          </div>

          <!-- Quick Write Button -->
          <router-link 
            to="/posts/create"
            :class="[
              'group inline-flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden',
              darkMode 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
            ]"
          >
            <!-- Button Shine Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <svg class="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span class="relative z-10">New Story</span>
          </router-link>
        </div>
      </div>

      <!-- Progress Bar Section -->
      <div class="mt-6 pt-6 border-t" :class="darkMode ? 'border-gray-700/50' : 'border-gray-200/50'">
        <div class="flex items-center justify-between mb-3">
          <span :class="['text-sm font-semibold uppercase tracking-wide', darkMode ? 'text-gray-400' : 'text-gray-500']">
            Writing Journey
          </span>
          <span :class="['text-sm font-bold', darkMode ? 'text-blue-400' : 'text-blue-600']">
            {{ writingProgress }}% Complete
          </span>
        </div>
        <div class="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden">
          <div 
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
            :style="{ width: `${writingProgress}%` }"
          >
            <!-- Progress Bar Shine -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-2000"></div>
          </div>
        </div>
        <div class="flex justify-between text-xs mt-2" :class="darkMode ? 'text-gray-500' : 'text-gray-400'">
          <span>Beginner</span>
          <span>Pro Writer</span>
        </div>
      </div>
    </div>
  </div>
</div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="relative inline-block">
          <div class="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p :class="['mt-6 text-lg font-medium', darkMode ? 'text-gray-300' : 'text-gray-700']">
          Preparing your dashboard...
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="!user" class="text-center py-20">
        <div class="max-w-md mx-auto">
          <div class="relative mb-6">
            <div class="w-32 h-32 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
              <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
          </div>
          <h3 :class="['text-2xl font-bold mb-4', darkMode ? 'text-white' : 'text-gray-900']">
            Access Required
          </h3>
          <p :class="['mb-8 text-lg', darkMode ? 'text-gray-400' : 'text-gray-600']">
            Please sign in to access your author dashboard
          </p>
          <router-link 
            to="/login" 
            class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            <span>Sign In to Dashboard</span>
          </router-link>
        </div>
      </div>

      <!-- Main Dashboard Content -->
      <div v-else>
        <!-- Stats Grid with Enhanced Design -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- My Posts Card -->
          <div :class="[
            'group relative overflow-hidden rounded-2xl p-6 transform transition-all duration-300 hover:scale-105',
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700' 
              : 'bg-white/80 backdrop-blur-sm shadow-xl border border-white/20'
          ]">
            <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
                <div class="text-right">
                  <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p :class="[
                'text-sm font-medium mb-1',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                My Posts
              </p>
              <p :class="[
                'text-3xl font-bold mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalPosts || 0 }}
              </p>
              <div class="w-full bg-gray-700/30 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="{ width: `${Math.min((stats.totalPosts / 50) * 100, 100)}%` }"></div>
              </div>
            </div>
          </div>

          <!-- Total Likes Card -->
          <div :class="[
            'group relative overflow-hidden rounded-2xl p-6 transform transition-all duration-300 hover:scale-105',
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700' 
              : 'bg-white/80 backdrop-blur-sm shadow-xl border border-white/20'
          ]">
            <div class="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                  </svg>
                </div>
                <div class="text-right">
                  <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p :class="[
                'text-sm font-medium mb-1',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Total Likes
              </p>
              <p :class="[
                'text-3xl font-bold mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalLikes || 0 }}
              </p>
              <div class="w-full bg-gray-700/30 rounded-full h-2">
                <div class="bg-red-500 h-2 rounded-full" :style="{ width: `${Math.min((stats.totalLikes / 500) * 100, 100)}%` }"></div>
              </div>
            </div>
          </div>

          <!-- Total Comments Card -->
          <div :class="[
            'group relative overflow-hidden rounded-2xl p-6 transform transition-all duration-300 hover:scale-105',
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700' 
              : 'bg-white/80 backdrop-blur-sm shadow-xl border border-white/20'
          ]">
            <div class="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <div class="text-right">
                  <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p :class="[
                'text-sm font-medium mb-1',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Total Comments
              </p>
              <p :class="[
                'text-3xl font-bold mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalComments || 0 }}
              </p>
              <div class="w-full bg-gray-700/30 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" :style="{ width: `${Math.min((stats.totalComments / 200) * 100, 100)}%` }"></div>
              </div>
            </div>
          </div>

          <!-- Total Views Card -->
          <div :class="[
            'group relative overflow-hidden rounded-2xl p-6 transform transition-all duration-300 hover:scale-105',
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700' 
              : 'bg-white/80 backdrop-blur-sm shadow-xl border border-white/20'
          ]">
            <div class="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
                <div class="text-right">
                  <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p :class="[
                'text-sm font-medium mb-1',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Total Views
              </p>
              <p :class="[
                'text-3xl font-bold mb-2',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalViews || 0 }}
              </p>
              <div class="w-full bg-gray-700/30 rounded-full h-2">
                <div class="bg-purple-500 h-2 rounded-full" :style="{ width: `${Math.min((stats.totalViews / 1000) * 100, 100)}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Posts Section -->
          <div class="lg:col-span-3">
            <!-- Status Tabs with Enhanced Design -->
            <div :class="[
              'rounded-2xl p-6 mb-6 backdrop-blur-lg border',
              darkMode 
                ? 'bg-gray-800/60 border-gray-700 shadow-xl' 
                : 'bg-white/70 border-white/20 shadow-lg'
            ]">
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tab in statusTabs"
                  :key="tab.id"
                  @click="activeStatusTab = tab.id"
                  :class="[
                    'group relative flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105',
                    activeStatusTab === tab.id
                      ? tab.activeClass + ' shadow-lg'
                      : darkMode
                        ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                        : 'bg-white/50 text-gray-600 hover:bg-white/80'
                  ]"
                >
                  <span>{{ tab.name }}</span>
                  <span :class="[
                    'px-2 py-1 text-xs rounded-full font-bold transition-all',
                    activeStatusTab === tab.id
                      ? tab.badgeActiveClass
                      : darkMode
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gray-200 text-gray-500'
                  ]">
                    {{ getStatusTabCount(tab.id) }}
                  </span>
                  <div v-if="activeStatusTab === tab.id" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-current rounded-full"></div>
                </button>
              </div>
            </div>

            <!-- Posts Grid -->
            <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div 
                v-for="post in filteredPosts" 
                :key="post._id"
                :class="[
                  'group relative rounded-2xl p-5 transition-all duration-500 hover:scale-105 overflow-hidden',
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:shadow-2xl' 
                    : 'bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-xl'
                ]"
              >
                <!-- Background Gradient Effect -->
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Post Header -->
                <div class="relative z-10">
                  <div class="flex items-start justify-between mb-4">
                    <h3 
                      @click="$router.push(`/posts/${post._id}`)"
                      :class="[
                        'font-bold text-lg leading-tight hover:text-blue-500 transition-colors cursor-pointer line-clamp-2 flex-1 pr-2',
                        darkMode ? 'text-white' : 'text-gray-900'
                      ]"
                    >
                      {{ post.title }}
                    </h3>
                    <div class="flex flex-col items-end space-y-2">
                      <span :class="[
                        'px-3 py-1 text-xs rounded-full font-bold border',
                        post.status === 'published' 
                          ? 'bg-green-500/20 text-green-600 border-green-500/30 dark:text-green-400'
                          : post.status === 'draft'
                          ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400'
                          : 'bg-gray-500/20 text-gray-600 border-gray-500/30 dark:text-gray-400'
                      ]">
                        {{ post.status }}
                      </span>
                    </div>
                  </div>

                  <!-- Post Image -->
                  <div v-if="post.image" class="mb-4 rounded-xl overflow-hidden">
                    <img 
                      :src="`http://localhost:5000${post.image}`" 
                      :alt="post.title"
                      class="w-full h-40 object-cover cursor-pointer transform group-hover:scale-110 transition-transform duration-500"
                      @click="$router.push(`/posts/${post._id}`)"
                    />
                  </div>

                  <!-- Post Content Preview -->
                  <p class="text-sm mb-4 line-clamp-3 leading-relaxed" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
                    {{ post.content?.substring(0, 120) }}...
                  </p>

                  <!-- Post Stats -->
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-4">
                      <span class="flex items-center space-x-1 text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <span>{{ post.views || 0 }}</span>
                      </span>
                      <span class="flex items-center space-x-1 text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                        </svg>
                        <span>{{ post.likesCount || 0 }}</span>
                      </span>
                      <span class="flex items-center space-x-1 text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        <span>{{ post.commentsCount || 0 }}</span>
                      </span>
                    </div>
                    <span class="text-xs font-medium" :class="darkMode ? 'text-gray-500' : 'text-gray-400'">
                      {{ formatDate(post.createdAt) }}
                    </span>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center justify-between pt-4 border-t" :class="darkMode ? 'border-gray-700' : 'border-gray-200/50'">
                    <div class="flex space-x-2">
                      <button 
                        @click="editPost(post)"
                        :class="[
                          'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105',
                          darkMode 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                        ]"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        <span>Edit</span>
                      </button>

                      <button 
                        v-if="post.status === 'draft'"
                        @click="publishPost(post)"
                        :class="[
                          'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105',
                          darkMode 
                            ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                            : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                        ]"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>Publish</span>
                      </button>
                    </div>

                    <div class="flex items-center space-x-2">
                      <button 
                        @click="confirmDeletePost(post)"
                        :class="[
                          'p-2 rounded-lg transition-all duration-300 transform hover:scale-110',
                          darkMode 
                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10' 
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-500/10'
                        ]"
                        title="Delete Post"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-16">
              <div class="max-w-md mx-auto">
                <div class="relative mb-6">
                  <div class="w-32 h-32 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </div>
                </div>
                <h3 :class="['text-2xl font-bold mb-4', darkMode ? 'text-white' : 'text-gray-900']">
                  No {{ activeStatusTab }} posts yet
                </h3>
                <p :class="['mb-8 text-lg leading-relaxed', darkMode ? 'text-gray-400' : 'text-gray-600']">
                  {{ getEmptyStateMessage(activeStatusTab) }}
                </p>
                <router-link 
                  v-if="activeStatusTab === 'draft' || activeStatusTab === 'all'"
                  to="/posts/create" 
                  class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span>Create Your First Post</span>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Actions -->
            <div :class="[
              'rounded-2xl p-6 backdrop-blur-lg border',
              darkMode 
                ? 'bg-gray-800/60 border-gray-700 shadow-xl' 
                : 'bg-white/70 border-white/20 shadow-lg'
            ]">
              <h3 :class="[
                'text-xl font-bold mb-6 flex items-center space-x-2',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span>Quick Actions</span>
              </h3>
              <div class="space-y-3">
                <router-link 
                  to="/posts/create"
                  :class="[
                    'group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-105',
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-white border border-blue-500/20' 
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 border border-blue-200'
                  ]"
                >
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                  <span class="font-medium">Write New Post</span>
                </router-link>
                
                <router-link 
                  to="/profile"
                  :class="[
                    'group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-105',
                    darkMode 
                      ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 text-white border border-green-500/20' 
                      : 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-gray-700 border border-green-200'
                  ]"
                >
                  <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <span class="font-medium">Edit Profile</span>
                </router-link>

                <button 
                  @click="refreshData"
                  :disabled="loading"
                  :class="[
                    'group flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 w-full text-left',
                    loading ? 'opacity-50 cursor-not-allowed' : '',
                    darkMode 
                      ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 hover:from-orange-600/30 hover:to-red-600/30 text-white border border-orange-500/20' 
                      : 'bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 text-gray-700 border border-orange-200'
                  ]"
                >
                  <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5 text-white" :class="{'animate-spin': loading}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                  </div>
                  <span class="font-medium">Refresh Data</span>
                </button>
              </div>
            </div>

            <!-- Recent Comments -->
            <div :class="[
              'rounded-2xl p-6 backdrop-blur-lg border',
              darkMode 
                ? 'bg-gray-800/60 border-gray-700 shadow-xl' 
                : 'bg-white/70 border-white/20 shadow-lg'
            ]">
              <h3 :class="[
                'text-xl font-bold mb-6 flex items-center space-x-2',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span>Recent Comments</span>
              </h3>
              <div v-if="recentComments.length > 0" class="space-y-4">
                <div 
                  v-for="comment in recentComments" 
                  :key="comment._id"
                  class="group p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105"
                  :class="darkMode 
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                    : 'bg-white/50 border-gray-200/50 hover:bg-white/80'"
                  @click="$router.push(`/posts/${comment.post?._id || comment.post}`)"
                >
                  <div class="flex items-start space-x-3 mb-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {{ comment.author?.username?.charAt(0).toUpperCase() || 'U' }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium truncate" :class="darkMode ? 'text-white' : 'text-gray-900'">
                        {{ comment.author?.username || 'Unknown' }}
                      </p>
                      <p class="text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                        {{ formatTimeAgo(comment.createdAt) }}
                      </p>
                    </div>
                  </div>
                  <p class="text-sm mb-3 line-clamp-2 italic leading-relaxed" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                    "{{ comment.content }}"
                  </p>
                  <div class="text-xs font-medium flex items-center space-x-1" :class="darkMode ? 'text-blue-400' : 'text-blue-600'">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                    <span class="truncate">{{ comment.post?.title || 'Post' }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <div class="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <p :class="[
                  'text-sm font-medium',
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  No comments on your posts yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog
      :visible="deleteDialog.visible"
      :title="deleteDialog.title"
      :message="deleteDialog.message"
      :confirm-text="deleteDialog.confirmText"
      type="danger"
      @confirm="deletePost"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { postsAPI, commentsAPI, authAPI } from '@/services/api'
import ToastService from '@/services/ToastService'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'

export default {
  name: 'AuthorDashboard',
  components: {
    ConfirmDialog
  },
  data() {
    return {
      stats: {
        totalPosts: 0,
        totalLikes: 0,
        totalComments: 0,
        totalViews: 0
      },
      myPosts: [],
      recentComments: [],
      loading: true,
      error: null,
      dataLoaded: false,
      activeStatusTab: 'all',
      statusTabs: [
        { 
          id: 'all', 
          name: 'All Posts', 
          activeClass: 'border-blue-500 text-blue-600', 
          badgeActiveClass: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
        },
        { 
          id: 'published', 
          name: 'Published', 
          activeClass: 'border-green-500 text-green-600', 
          badgeActiveClass: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
        },
        { 
          id: 'draft', 
          name: 'Drafts', 
          activeClass: 'border-yellow-500 text-yellow-600', 
          badgeActiveClass: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' 
        },
        { 
          id: 'archived', 
          name: 'Archived', 
          activeClass: 'border-gray-500 text-gray-600', 
          badgeActiveClass: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' 
        }
      ],
      deleteDialog: {
        visible: false,
        post: null
      },
      currentDate: '',
      currentTime: '',
      writingProgress: 0
    }
  },
  computed: {
    ...mapState(['user', 'darkMode']),
    userId() {
      return this.user?._id || null
    },
    filteredPosts() {
      if (this.activeStatusTab === 'all') {
        return this.myPosts
      }
      return this.myPosts.filter(post => post.status === this.activeStatusTab)
    }
  },
  async mounted() {
    await this.initializeDashboard()
    this.setupSocketListeners()
     this.updateDateTime()
    this.datetimeInterval = setInterval(this.updateDateTime, 1000)
      // Animate progress bar
    setTimeout(() => {
      this.animateProgress()
    }, 500)
  },
  beforeUnmount() {
    this.cleanupSocketListeners()
     if (this.datetimeInterval) {
      clearInterval(this.datetimeInterval)
    }
  },
  methods: {
    ...mapActions(['initializeDarkMode']),
    
    async initializeDashboard() {
      console.log('Initializing dashboard...')
      
      if (!this.user || !this.user._id) {
        await this.loadUserData()
      }
      
      if (this.user && this.user._id) {
        await this.loadAuthorData()
      } else {
        this.loading = false
        this.error = 'Unable to load user data'
      }
    },

    async loadUserData() {
      try {
        console.log('Loading user data...')
        const token = localStorage.getItem('token')
        if (!token) {
          this.error = 'No authentication token found'
          return
        }

        const response = await authAPI.getMe()
        if (response.data.success) {
          this.$store.commit('SET_USER', response.data.data)
          console.log('User data loaded successfully:', response.data.data._id)
          return true
        }
      } catch (error) {
        console.error('Failed to load user data:', error)
        this.error = 'Failed to load user data'
        return false
      }
    },

   async loadAuthorData() {
  if (!this.userId) {
    console.error('User ID is missing')
    this.loading = false
    this.error = 'User authentication required'
    return
  }

  this.loading = true
  this.error = null
  
  try {
    console.log('Loading author data for user:', this.userId)
    
    // استخدم الـ API الجديد المخصص للداشبورد
    const postsResponse = await postsAPI.getAll({ 
      author: this.userId,
      status: this.activeStatusTab === 'all' ? '' : this.activeStatusTab,
      limit: 50,
      sortBy: 'createdAt',
      order: 'desc'
    })
    
    console.log('Posts loaded:', postsResponse.data.data?.length || 0)
    
    if (postsResponse.data.success) {
      this.myPosts = postsResponse.data.data || []
      this.calculateStats()
      await this.loadRecentComments()
      this.dataLoaded = true
      ToastService.success('Dashboard loaded successfully!')
    } else {
      console.error('Failed to load posts:', postsResponse.data)
      this.error = 'Failed to load posts data'
      ToastService.error('Failed to load posts')
    }

  } catch (error) {
    console.error('Error loading author data:', error)
    this.error = 'Failed to load dashboard data'
    ToastService.error('Failed to load dashboard')
    this.generateMockData()
  } finally {
    this.loading = false
  }
},

    async loadRecentComments() {
      if (!this.userId) {
        this.recentComments = []
        return
      }

      try {
        // المحاولة الأولى: استخدام API المخصص
        try {
          const commentsResponse = await commentsAPI.getByAuthorPosts(this.userId, { 
            limit: 10,
            sortBy: 'createdAt',
            order: 'desc'
          })
          
          if (commentsResponse.data.success) {
            this.recentComments = commentsResponse.data.data.slice(0, 5)
            console.log('Recent comments loaded via author API:', this.recentComments.length)
            return
          }
        } catch (apiError) {
          console.log('Author comments API failed, trying alternative...')
        }
        
        // المحاولة الثانية: استخدام API عام مع فلترة
        try {
          const allCommentsResponse = await commentsAPI.getAll({
            limit: 50,
            sortBy: 'createdAt',
            order: 'desc'
          })
          
          if (allCommentsResponse.data.success) {
            const userPostIds = this.myPosts.map(post => post._id)
            const filteredComments = allCommentsResponse.data.data.filter(comment => 
              userPostIds.includes(comment.post?._id || comment.post)
            )
            
            this.recentComments = filteredComments.slice(0, 5)
            console.log('Recent comments loaded via general API:', this.recentComments.length)
            return
          }
        } catch (generalError) {
          console.log('General comments API failed, using fallback...')
        }
        
        // المحاولة الثالثة: البديل
        await this.loadCommentsFromPosts()
          
      } catch (error) {
        console.error('Error loading comments:', error)
        this.recentComments = []
      }
    },

    async loadCommentsFromPosts() {
      if (!this.myPosts.length) {
        this.recentComments = []
        return
      }

      try {
        const allComments = []
        const postIds = this.myPosts.slice(0, 5).map(post => post._id)
        
        for (const postId of postIds) {
          try {
            const commentsResponse = await commentsAPI.getByPost(postId, { limit: 3 })
            if (commentsResponse.data.success) {
              allComments.push(...commentsResponse.data.data.map(comment => ({
                ...comment,
                post: { _id: postId, title: this.myPosts.find(p => p._id === postId)?.title }
              })))
            }
          } catch (error) {
            console.error(`Error loading comments for post ${postId}:`, error)
          }
        }
        
        this.recentComments = allComments
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          
      } catch (error) {
        console.error('Error loading comments from posts:', error)
        this.recentComments = []
      }
    },

    setupSocketListeners() {
      window.addEventListener('socket-newPost', this.handleNewPost)
      window.addEventListener('socket-newComment', this.handleNewComment)
      window.addEventListener('socket-newLike', this.handleNewLike)
    },

    cleanupSocketListeners() {
      window.removeEventListener('socket-newPost', this.handleNewPost)
      window.removeEventListener('socket-newComment', this.handleNewComment)
      window.removeEventListener('socket-newLike', this.handleNewLike)
    },

    handleNewPost(event) {
      const newPost = event.detail
      console.log('New post received via socket:', newPost)
      
      if (newPost.author._id === this.userId || newPost.author === this.userId) {
        this.myPosts.unshift(newPost)
        this.calculateStats()
        ToastService.success('New post published successfully!')
      }
    },

    handleNewComment(event) {
      const { comment, postId } = event.detail
      console.log('New comment received via socket:', comment)
      
      const targetPost = this.myPosts.find(post => post._id === postId)
      if (targetPost) {
        this.stats.totalComments += 1
        targetPost.commentsCount = (targetPost.commentsCount || 0) + 1
        
        this.recentComments.unshift({
          ...comment,
          post: { _id: postId, title: targetPost.title }
        })
        
        if (this.recentComments.length > 5) {
          this.recentComments = this.recentComments.slice(0, 5)
        }
        
        ToastService.info('New comment on your post!')
      }
    },

    handleNewLike(event) {
      const { type, targetId, userId, reactionType } = event.detail
      console.log('New like received via socket:', type, targetId)
      
      if (type === 'Post') {
        const targetPost = this.myPosts.find(post => post._id === targetId)
        if (targetPost) {
          targetPost.likesCount = (targetPost.likesCount || 0) + 1
          this.calculateStats()
          ToastService.success('Someone liked your post!')
        }
      } else if (type === 'Comment') {
        ToastService.success('Someone liked your comment!')
      }
    },

    calculateStats() {
      if (this.myPosts.length > 0) {
        this.stats = {
          totalPosts: this.myPosts.length,
          totalLikes: this.myPosts.reduce((sum, post) => sum + (post.likesCount || 0), 0),
          totalComments: this.myPosts.reduce((sum, post) => sum + (post.commentsCount || 0), 0),
          totalViews: this.myPosts.reduce((sum, post) => sum + (post.views || 0), 0)
        }
      } else {
        this.stats = {
          totalPosts: 0,
          totalLikes: 0,
          totalComments: 0,
          totalViews: 0
        }
      }
    },

    getStatusTabCount(tabId) {
      if (tabId === 'all') return this.myPosts.length
      return this.myPosts.filter(post => post.status === tabId).length
    },

    getEmptyStateMessage(tab) {
      const messages = {
        all: 'You haven\'t created any posts yet.',
        published: 'You don\'t have any published posts.',
        draft: 'You don\'t have any draft posts.',
        archived: 'You don\'t have any archived posts.'
      }
      return messages[tab] || 'No posts found.'
    },

    // getImageUrl(imagePath) {
    //   if (!imagePath) return '';
    //   if (imagePath.startsWith('http')) return imagePath;
    //   if (imagePath.startsWith('/uploads')) return `http://localhost:5000${imagePath}`;
    //   return `http://localhost:5000/uploads/${imagePath}`;
    // },

    async refreshData() {
      console.log('Refreshing dashboard data...')
      this.loading = true
      await this.loadAuthorData()
      ToastService.info('Dashboard data refreshed!')
    },

    editPost(post) {
  this.$router.push(`/posts/${post._id}/edit`)
   },

    async publishPost(post) {
      try {
        const response = await postsAPI.update(post._id, { status: 'published' })
        if (response.data.success) {
          post.status = 'published'
          ToastService.success('Post published successfully!')
        }
      } catch (error) {
        console.error('Error publishing post:', error)
        ToastService.error('Failed to publish post')
      }
    },

    async unpublishPost(post) {
      try {
        const response = await postsAPI.update(post._id, { status: 'draft' })
        if (response.data.success) {
          post.status = 'draft'
          ToastService.success('Post unpublished successfully!')
        }
      } catch (error) {
        console.error('Error unpublishing post:', error)
        ToastService.error('Failed to unpublish post')
      }
    },

    async archivePost(post) {
      try {
        const response = await postsAPI.update(post._id, { status: 'archived' })
        if (response.data.success) {
          post.status = 'archived'
          ToastService.success('Post archived successfully!')
        }
      } catch (error) {
        console.error('Error archiving post:', error)
        ToastService.error('Failed to archive post')
      }
    },

// بديل في Dashboard.vue - تحديث دالة confirmDeletePost
 confirmDeletePost(post) {
      this.deleteDialog.post = post
      this.deleteDialog.message = `Are you sure you want to delete "${post.title}"? This action cannot be undone.`
      this.deleteDialog.visible = true
    },

    // تنفيذ الحذف
    async deletePost() {
      if (!this.deleteDialog.post) return
      
      const postToDelete = this.deleteDialog.post
      
      try {
        await postsAPI.delete(postToDelete._id)
        this.myPosts = this.myPosts.filter(p => p._id !== postToDelete._id)
        this.calculateStats()
        ToastService.success('Post deleted successfully!')
      } catch (error) {
        console.error('Error deleting post:', error)
        ToastService.error('Failed to delete post')
      } finally {
        this.cancelDelete()
      }
    },

    // إلغاء الحذف
    cancelDelete() {
      this.deleteDialog.visible = false
      this.deleteDialog.post = null
      this.deleteDialog.message = ''
    },
    formatDate(dateString) {
      if (!dateString) return 'Unknown date'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    formatTimeAgo(timestamp) {
      if (!timestamp) return 'Unknown time'
      
      const now = new Date()
      const time = new Date(timestamp)
      const diff = now - time
      
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)
      
      if (minutes < 1) return 'Just now'
      if (minutes < 60) return `${minutes}m ago`
      if (hours < 24) return `${hours}h ago`
     if (days < 7) return `${days}d ago`
      
      return this.formatDate(timestamp)
    },

    generateMockData() {
      this.myPosts = []
      this.recentComments = []
      this.stats = {
        totalPosts: 0,
        totalLikes: 0,
        totalComments: 0,
        totalViews: 0
      }
    },
     updateDateTime() {
      const now = new Date()
      this.currentDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      this.currentTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    animateProgress() {
      const targetProgress = Math.min(((this.stats.totalPosts || 0) / 10) * 100, 100)
      const duration = 2000
      const steps = 60
      const increment = targetProgress / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= targetProgress) {
          this.writingProgress = Math.round(targetProgress)
          clearInterval(timer)
        } else {
          this.writingProgress = Math.round(current)
        }
      }, duration / steps)
    }
  }
  


}
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Smooth gradient transitions */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>