<template>
  <div class="min-h-screen" :class="darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'">
    <!-- Animated Background Elements -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Admin Header -->
      <div class="mb-8">
        <div :class="[
          'relative rounded-3xl p-8 mb-6 backdrop-blur-xl border overflow-hidden',
          darkMode 
            ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 shadow-2xl' 
            : 'bg-white/80 backdrop-blur-sm border-white/20 shadow-2xl'
        ]">
          <!-- Background Pattern -->
          <!-- <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image:
             url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"%23000\" cx=\"30\" cy=\"30\" r=\"1\"/></g></svg>');"></div>
          </div> -->
          
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <div class="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 :class="[
                    'text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent',
                    darkMode 
                      ? 'from-yellow-400 to-orange-500' 
                      : 'from-blue-600 to-purple-600'
                  ]">
                    Admin Dashboard 👑
                  </h1>
                  <p :class="[
                    'text-lg font-medium',
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  ]">
                    Complete control over your blogging platform
                  </p>
                </div>
              </div>
              <div class="text-right">
                <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-full" :class="darkMode ? 'bg-gray-700/50' : 'bg-white/50'">
                  <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span :class="['text-sm font-medium', darkMode ? 'text-gray-300' : 'text-gray-600']">System Online</span>
                </div>
                <p class="text-sm mt-2" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                  {{ currentDateTime }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Users Card -->
        <div :class="[
          'group relative rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden',
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/30 shadow-2xl' 
            : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl'
        ]">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p :class="[
              'text-sm font-medium mb-2 uppercase tracking-wider',
              darkMode ? 'text-blue-300' : 'text-blue-600'
            ]">
              Total Users
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalUsers || 0 }}
            </p>
            <div class="flex items-center justify-between text-sm">
              <span :class="darkMode ? 'text-blue-300' : 'text-blue-600'">+12% this month</span>
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Posts Card -->
        <div :class="[
          'group relative rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden',
          darkMode 
            ? 'bg-gradient-to-br from-green-900/30 to-emerald-800/20 border border-green-700/30 shadow-2xl' 
            : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl'
        ]">
          <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p :class="[
              'text-sm font-medium mb-2 uppercase tracking-wider',
              darkMode ? 'text-green-300' : 'text-green-600'
            ]">
              Total Posts
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalPosts || 0 }}
            </p>
            <div class="flex items-center justify-between text-sm">
              <span :class="darkMode ? 'text-green-300' : 'text-green-600'">+8% this week</span>
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Comments Card -->
        <div :class="[
          'group relative rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden',
          darkMode 
            ? 'bg-gradient-to-br from-purple-900/30 to-violet-800/20 border border-purple-700/30 shadow-2xl' 
            : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl'
        ]">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p :class="[
              'text-sm font-medium mb-2 uppercase tracking-wider',
              darkMode ? 'text-purple-300' : 'text-purple-600'
            ]">
              Total Comments
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalComments || 0 }}
            </p>
            <div class="flex items-center justify-between text-sm">
              <span :class="darkMode ? 'text-purple-300' : 'text-purple-600'">+15% today</span>
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Likes Card -->
        <div :class="[
          'group relative rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden',
          darkMode 
            ? 'bg-gradient-to-br from-red-900/30 to-pink-800/20 border border-red-700/30 shadow-2xl' 
            : 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl'
        ]">
          <div class="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-4">
              <div class="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
              </div>
              <div class="text-right">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p :class="[
              'text-sm font-medium mb-2 uppercase tracking-wider',
              darkMode ? 'text-red-300' : 'text-red-600'
            ]">
              Total Likes
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ adminStats.totalLikes || 0 }}
            </p>
            <div class="flex items-center justify-between text-sm">
              <span :class="darkMode ? 'text-red-300' : 'text-red-600'">+23% this month</span>
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Recent Users -->
        <div :class="[
          'rounded-2xl p-6 backdrop-blur-lg border',
          darkMode 
            ? 'bg-gray-800/60 border-gray-700 shadow-2xl' 
            : 'bg-white/70 border-white/20 shadow-xl'
        ]">
          <div class="flex items-center justify-between mb-6">
            <h2 :class="[
              'text-xl font-bold flex items-center space-x-2',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span>Recent Users</span>
            </h2>
            <router-link 
              to="/admin/users"
              class="group flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium transition-all"
            >
              <span>View All</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>

          <div v-if="recentUsers.length > 0" class="space-y-3">
            <div 
              v-for="user in recentUsers" 
              :key="user._id"
              class="group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 cursor-pointer"
              :class="darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                : 'bg-white/50 border-gray-200/50 hover:bg-white/80'"
            >
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <img 
                    v-if="user.avatar" 
                    :src="`http://localhost:5000${user.avatar}`" 
                    class="w-12 h-12 rounded-xl object-cover shadow-lg"
                  />
                  <div v-else :class="[
                    'w-12 h-12 rounded-xl flex items-center justify-center shadow-lg text-white font-bold',
                    user.role === 'admin' 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500'
                      : user.role === 'author'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600'
                  ]">
                    {{ user.username?.charAt(0).toUpperCase() }}
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p :class="[
                    'font-semibold',
                    darkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ user.username }}
                  </p>
                  <p :class="[
                    'text-sm',
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">
                    {{ user.email }}
                  </p>
                </div>
              </div>
              <span :class="[
                'px-3 py-1 text-xs rounded-full font-bold border transition-all duration-300',
                user.role === 'admin' 
                  ? 'bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400 group-hover:bg-red-500/30'
                  : user.role === 'author'
                  ? 'bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400 group-hover:bg-blue-500/30'
                  : 'bg-gray-500/20 text-gray-600 border-gray-500/30 dark:text-gray-400 group-hover:bg-gray-500/30'
              ]">
                {{ user.role }}
              </span>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <div class="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              No users found
            </p>
          </div>
        </div>

        <!-- Recent Posts -->
        <div :class="[
          'rounded-2xl p-6 backdrop-blur-lg border',
          darkMode 
            ? 'bg-gray-800/60 border-gray-700 shadow-2xl' 
            : 'bg-white/70 border-white/20 shadow-xl'
        ]">
          <div class="flex items-center justify-between mb-6">
            <h2 :class="[
              'text-xl font-bold flex items-center space-x-2',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <span>Recent Posts</span>
            </h2>
            <router-link 
              to="/admin/posts"
              class="group flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium transition-all"
            >
              <span>View All</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </router-link>
          </div>

          <div v-if="recentPosts.length > 0" class="space-y-3">
            <div 
              v-for="post in recentPosts" 
              :key="post._id"
              class="group p-4 rounded-xl border cursor-pointer transition-all duration-300 transform hover:scale-105"
              :class="darkMode 
                ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                : 'bg-white/50 border-gray-200/50 hover:bg-white/80'"
              @click="$router.push(`/posts/${post._id}`)"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 :class="[
                  'font-semibold text-sm line-clamp-1 flex-1 pr-2',
                  darkMode ? 'text-white' : 'text-gray-900'
                ]">
                  {{ post.title }}
                </h3>
                <span :class="[
                  'px-3 py-1 text-xs rounded-full font-bold border transition-all duration-300',
                  post.status === 'published' 
                    ? 'bg-green-500/20 text-green-600 border-green-500/30 dark:text-green-400 group-hover:bg-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400 group-hover:bg-yellow-500/30'
                ]">
                  {{ post.status }}
                </span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center space-x-4">
                  <span class="flex items-center space-x-1" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span>{{ post.author?.username }}</span>
                  </span>
                  <span class="flex items-center space-x-1" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                    <span>{{ post.likesCount || 0 }}</span>
                  </span>
                </div>
                <span class="font-medium" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                  {{ formatDate(post.createdAt) }}
                </span>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8">
            <div class="w-16 h-16 bg-gray-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              No posts found
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div :class="[
        'rounded-2xl p-8 backdrop-blur-lg border',
        darkMode 
          ? 'bg-gray-800/60 border-gray-700 shadow-2xl' 
          : 'bg-white/70 border-white/20 shadow-xl'
      ]">
        <h2 :class="[
          'text-2xl font-bold mb-8 text-center',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          Quick Actions
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            to="/admin/users"
            :class="[
              'group relative p-6 rounded-2xl border-2 text-center transition-all duration-500 transform hover:scale-105 hover:rotate-1 overflow-hidden',
              darkMode 
                ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/30 hover:border-blue-500/50 text-white' 
                : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300 text-gray-700'
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <h3 class="font-bold text-lg mb-2">Manage Users</h3>
              <p class="text-sm opacity-75">View and manage all platform users</p>
            </div>
          </router-link>

          <router-link
            to="/admin/posts"
            :class="[
              'group relative p-6 rounded-2xl border-2 text-center transition-all duration-500 transform hover:scale-105 hover:rotate-1 overflow-hidden',
              darkMode 
                ? 'bg-gradient-to-br from-green-900/30 to-emerald-800/20 border-green-700/30 hover:border-green-500/50 text-white' 
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300 text-gray-700'
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              <h3 class="font-bold text-lg mb-2">Manage Posts</h3>
              <p class="text-sm opacity-75">Review and moderate all posts</p>
            </div>
          </router-link>

          <router-link
            to="/admin/comments"
            :class="[
              'group relative p-6 rounded-2xl border-2 text-center transition-all duration-500 transform hover:scale-105 hover:rotate-1 overflow-hidden',
              darkMode 
                ? 'bg-gradient-to-br from-purple-900/30 to-violet-800/20 border-purple-700/30 hover:border-purple-500/50 text-white' 
                : 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:border-purple-300 text-gray-700'
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 class="font-bold text-lg mb-2">Manage Comments</h3>
              <p class="text-sm opacity-75">Moderate user comments</p>
            </div>
          </router-link>

          <router-link
            to="/admin/settings"
            :class="[
              'group relative p-6 rounded-2xl border-2 text-center transition-all duration-500 transform hover:scale-105 hover:rotate-1 overflow-hidden',
              darkMode 
                ? 'bg-gradient-to-br from-yellow-900/30 to-amber-800/20 border-yellow-700/30 hover:border-yellow-500/50 text-white' 
                : 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-300 text-gray-700'
            ]"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 class="font-bold text-lg mb-2">Settings</h3>
              <p class="text-sm opacity-75">Platform configuration</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersAPI, postsAPI } from '@/services/api'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      adminStats: {},
      recentUsers: [],
      recentPosts: [],
      loading: false,
      currentDateTime: ''
    }
  },
  computed: {
    ...mapState(['user', 'darkMode'])
  },
  async mounted() {
    this.updateDateTime()
    this.datetimeInterval = setInterval(this.updateDateTime, 1000)
    await this.loadAdminData()
  },
  beforeUnmount() {
    if (this.datetimeInterval) {
      clearInterval(this.datetimeInterval)
    }
  },
  methods: {
    updateDateTime() {
      this.currentDateTime = new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },

    async loadAdminData() {
      this.loading = true
      try {
        // Load all users
        const usersResponse = await usersAPI.getAll({ limit: 5 })
        if (usersResponse.data.success) {
          this.recentUsers = usersResponse.data.data
        }

        // Load all posts
        const postsResponse = await postsAPI.getAll({ limit: 5, sortBy: 'createdAt', order: 'desc' })
        if (postsResponse.data.success) {
          this.recentPosts = postsResponse.data.data
        }

        // Calculate admin stats
        this.calculateAdminStats()

      } catch (error) {
        console.error('Error loading admin data:', error)
        this.generateMockAdminData()
      } finally {
        this.loading = false
      }
    },

    calculateAdminStats() {
      this.adminStats = {
        totalUsers: this.recentUsers.length,
        totalPosts: this.recentPosts.length,
        totalComments: this.recentPosts.reduce((sum, post) => sum + (post.commentsCount || 0), 0),
        totalLikes: this.recentPosts.reduce((sum, post) => sum + (post.likesCount || 0), 0)
      }
    },

    generateMockAdminData() {
      // Mock data implementation remains the same
      this.calculateAdminStats()
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>