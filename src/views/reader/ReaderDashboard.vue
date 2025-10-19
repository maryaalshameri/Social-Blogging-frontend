<template>
  <div class="min-h-screen" :class="darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;"></div>
      <div class="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2.5s;"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Enhanced Welcome Header -->
      <div class="mb-8">
        <div :class="[
          'relative rounded-3xl p-8 mb-6 overflow-hidden transform transition-all duration-700 hover:scale-[1.02]',
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
          </div>

          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <!-- User Info Section -->
              <div class="flex items-center space-x-6">
                <!-- Enhanced Avatar -->
                <div class="relative">
                  <div class="relative">
                    <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform transition-transform duration-500 hover:rotate-6">
                      {{ user.username?.charAt(0).toUpperCase() }}
                    </div>
                    
                    <!-- Reader Badge -->
                    <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                      </svg>
                    </div>

                    <!-- Decorative Elements -->
                    <div class="absolute -top-2 -left-2 w-6 h-6 border-2 border-blue-300/50 rounded-lg animate-ping"></div>
                  </div>
                </div>

                <!-- Welcome Text -->
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-3">
                    <h1 :class="[
                      'text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent',
                      darkMode 
                        ? 'from-blue-400 via-purple-400 to-cyan-400' 
                        : 'from-blue-600 via-purple-600 to-cyan-600'
                    ]">
                      Welcome, {{ user.username }}! 
                    </h1>
                    <div class="text-3xl animate-bounce" style="animation-delay: 0.3s;">📚</div>
                  </div>
                  
                  <p :class="[
                    'text-xl font-medium',
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  ]">
                    Discover amazing stories and 
                    <span class="relative inline-block">
                      <span :class="[
                        'font-bold bg-gradient-to-r bg-clip-text text-transparent',
                        darkMode 
                          ? 'from-yellow-400 to-orange-400' 
                          : 'from-orange-500 to-red-500'
                      ]">
                        share your thoughts
                      </span>
                      <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
                    </span>
                  </p>

                  <!-- Reading Stats -->
                  <div class="flex items-center space-x-6 mt-4">
                    <div class="flex items-center space-x-2" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                      <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-sm font-medium">Active Reader</span>
                    </div>
                    <div class="flex items-center space-x-2" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                      <span class="text-sm font-medium">{{ stats.likedPosts || 0 }} Stories Liked</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Date & Quick Actions -->
              <div class="text-right space-y-4">
                <!-- Date Card -->
                <div :class="[
                  'inline-flex flex-col items-center p-4 rounded-2xl border backdrop-blur-sm',
                  darkMode 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white/50 border-white/30'
                ]">
                  <p :class="[
                    'text-sm font-semibold uppercase tracking-wider mb-2',
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
                    'text-sm mt-1',
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  ]">
                    {{ currentTime }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Reader Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Liked Posts Card -->
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
              Liked Posts
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.likedPosts || 0 }}
            </p>
            <div class="w-full bg-gray-700/30 rounded-full h-2">
              <div class="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-1000" 
                   :style="{ width: `${Math.min((stats.likedPosts / 20) * 100, 100)}%` }"></div>
            </div>
          </div>
        </div>

        <!-- My Comments Card -->
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
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
              My Comments
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.myComments || 0 }}
            </p>
            <div class="w-full bg-gray-700/30 rounded-full h-2">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000" 
                   :style="{ width: `${Math.min((stats.myComments / 15) * 100, 100)}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Following Card -->
        <div :class="[
          'group relative rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 hover:rotate-1 overflow-hidden',
          darkMode 
            ? 'bg-gradient-to-br from-blue-900/30 to-cyan-800/20 border border-blue-700/30 shadow-2xl' 
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
              Following
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.following || 0 }}
            </p>
            <div class="w-full bg-gray-700/30 rounded-full h-2">
              <div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000" 
                   :style="{ width: `${Math.min((stats.following / 10) * 100, 100)}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Bookmarks Card -->
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
                <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
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
              Bookmarks
            </p>
            <p :class="[
              'text-3xl font-bold mb-3',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.bookmarks || 0 }}
            </p>
            <div class="w-full bg-gray-700/30 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full transition-all duration-1000" 
                   :style="{ width: `${Math.min((stats.bookmarks / 8) * 100, 100)}%` }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Feed -->
        <div class="lg:col-span-2">
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0 0h2m-2 0h4"/>
                </svg>
                <span>Latest Stories</span>
              </h2>
              <router-link 
                to="/"
                class="group flex items-center space-x-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium transition-all"
              >
                <span>Explore All</span>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>

            <div v-if="recentPosts.length > 0" class="space-y-4">
              <div 
                v-for="post in recentPosts" 
                :key="post._id"
                :class="[
                  'group p-6 rounded-2xl border cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-xl',
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50' 
                    : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
                ]"
                @click="$router.push(`/posts/${post._id}`)"
              >
                <div class="flex items-start justify-between mb-4">
                  <h3 :class="[
                    'font-bold text-lg leading-tight flex-1 pr-4',
                    darkMode ? 'text-white' : 'text-gray-900'
                  ]">
                    {{ post.title }}
                  </h3>
                  <span class="text-xs font-medium px-3 py-1 rounded-full" 
                        :class="darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'">
                    {{ formatDate(post.createdAt) }}
                  </span>
                </div>
                
                <p class="text-sm line-clamp-2 mb-4 leading-relaxed" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
                  {{ post.content }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4 text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                    <span class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      <span>{{ post.author?.username }}</span>
                    </span>
                    <span>{{ post.views || 0 }} views</span>
                  </div>
                  
                  <div class="flex items-center space-x-4">
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
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <div class="w-24 h-24 bg-gray-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0 0h2m-2 0h4"/>
                </svg>
              </div>
              <p :class="[
                'text-lg font-medium mb-2',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                No stories available
              </p>
              <p class="text-sm" :class="darkMode ? 'text-gray-500' : 'text-gray-400'">
                Check back later for new content
              </p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- My Interactions -->
          <div :class="[
            'rounded-2xl p-6 backdrop-blur-lg border',
            darkMode 
              ? 'bg-gray-800/60 border-gray-700 shadow-2xl' 
              : 'bg-white/70 border-white/20 shadow-xl'
          ]">
            <h3 :class="[
              'text-xl font-bold mb-6 flex items-center space-x-2',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/>
              </svg>
              <span>My Interactions</span>
            </h3>
            <div class="space-y-3">
              <router-link 
                to="/my-likes"
                class="group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 transform hover:scale-105"
                :class="[
                  $route.path === '/my-likes'
                    ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-600 dark:text-red-400'
                    : darkMode 
                      ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 text-gray-300' 
                      : 'bg-white/50 border-gray-200/50 hover:bg-white/80 text-gray-700'
                ]"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                  </div>
                  <span class="font-semibold">My Likes</span>
                </div>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>

              <router-link 
                to="/my-comments"
                class="group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 transform hover:scale-105"
                :class="[
                  $route.path === '/my-comments'
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-600 dark:text-green-400'
                    : darkMode 
                      ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 text-gray-300' 
                      : 'bg-white/50 border-gray-200/50 hover:bg-white/80 text-gray-700'
                ]"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <span class="font-semibold">My Comments</span>
                </div>
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </router-link>
            </div>
          </div>

          <!-- Quick Actions -->
          <div :class="[
            'rounded-2xl p-6 backdrop-blur-lg border',
            darkMode 
              ? 'bg-gray-800/60 border-gray-700 shadow-2xl' 
              : 'bg-white/70 border-white/20 shadow-xl'
          ]">
            <h3 :class="[
              'text-xl font-bold mb-6 flex items-center space-x-2',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Quick Actions</span>
            </h3>
            <div class="space-y-3">
              <router-link 
                to="/profile"
                class="group flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 transform hover:scale-105"
                :class="darkMode 
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 text-white' 
                  : 'bg-white/50 border-gray-200/50 hover:bg-white/80 text-gray-700'"
              >
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <span class="font-semibold">Edit Profile</span>
              </router-link>
              
              <router-link 
                to="/notifications"
                class="group flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 transform hover:scale-105"
                :class="darkMode 
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 text-white' 
                  : 'bg-white/50 border-gray-200/50 hover:bg-white/80 text-gray-700'"
              >
                <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM8.5 14.5A2.5 2.5 0 0011 12V4.5a4.5 4.5 0 10-9 0V12a2.5 2.5 0 002.5 2.5z"/>
                  </svg>
                </div>
                <span class="font-semibold">Notifications</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postsAPI } from '../../services/api'

export default {
  name: 'ReaderDashboard',
  data() {
    return {
      stats: {
        likedPosts: 0,
        myComments: 0,
        following: 0,
        bookmarks: 0
      },
      recentPosts: [],
      loading: false,
      currentDate: '',
      currentTime: ''
    }
  },
  computed: {
    ...mapState(['user', 'darkMode'])
  },
  async mounted() {
    this.updateDateTime()
    this.datetimeInterval = setInterval(this.updateDateTime, 1000)
    await this.loadDashboardData()
  },
  beforeUnmount() {
    if (this.datetimeInterval) {
      clearInterval(this.datetimeInterval)
    }
  },
  methods: {
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

    async loadDashboardData() {
      this.loading = true
      try {
        const postsResponse = await postsAPI.getAll({ 
          limit: 5,
          sortBy: 'createdAt',
          order: 'desc'
        })
        
        if (postsResponse.data.success) {
          this.recentPosts = postsResponse.data.data
        }

        await this.loadReaderStats()

      } catch (error) {
        console.error('Error loading reader dashboard:', error)
        this.generateMockData()
      } finally {
        this.loading = false
      }
    },

    async loadReaderStats() {
      // Simulate API call
      this.stats = {
        likedPosts: 12,
        myComments: 8,
        following: 5,
        bookmarks: 3
      }
    },

    generateMockData() {
      this.stats = {
        likedPosts: 0,
        myComments: 0,
        following: 0,
        bookmarks: 0
      }
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