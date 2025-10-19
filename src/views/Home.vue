<template>
  <div class="min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/10"></div>
      
      <!-- Animated Orbs -->
      <div class="absolute top-1/4 -left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-float dark:bg-purple-900/20"></div>
      <div class="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-float-delayed dark:bg-blue-900/20"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow dark:bg-pink-900/10"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-24 pb-32 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <!-- Animated Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg shadow-blue-500/5 dark:bg-gray-800/80 dark:border-gray-700/50 mb-8 animate-fade-in">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            🚀 Live Platform - Join Thousands of Writers
          </span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-6xl md:text-8xl font-black mb-8 leading-tight">
          <span class="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400 animate-gradient">
            Share Your
          </span>
          <br>
          <span class="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-red-400 animate-gradient-delayed">
            Story
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
          Where <span class="font-semibold text-blue-600 dark:text-blue-400">brilliant ideas</span> meet 
          <span class="font-semibold text-purple-600 dark:text-purple-400">inspiring communities</span>. 
          Write, share, and connect with readers worldwide in real-time.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up-delayed">
          <router-link 
            v-if="!isAuthenticated"
            to="/register" 
            class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 dark:shadow-blue-500/10"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative flex items-center gap-2">
              Start Writing Now
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
          </router-link>

          <router-link 
            v-if="isAuthenticated && user?.role !== 'reader'"
            to="/posts/create" 
            class="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative flex items-center gap-2">
             Create Magic
            <svg class="w-5 h-5 group-hover:scale-110 group-hover:rotate-45 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </span>
          </router-link>

          <button 
            @click="scrollToPosts"
            class="group px-6 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            <span class="flex items-center gap-2">
              Explore Stories
              <svg class="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </span>
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in-up-more-delayed">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {{ stat.value }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Posts Section -->
    <section id="posts" class="relative px-4 pb-32">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
              Trending Stories
            </h2>
            <div class="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          </div>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most engaging and inspiring content from our creative community
          </p>
        </div>

        <!-- Filters -->
        <div class="flex flex-col sm:flex-row items-center justify-between mb-12 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-blue-500/5">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
            Latest Inspiration
          </h3>
          
          <div class="flex items-center gap-4">
        <div class="relative group">
            <select 
              v-model="filters.sortBy"
              @change="loadPosts"
              class="appearance-none pl-12 pr-8 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white font-medium cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 shadow-lg hover:shadow-xl"
            >
              <option value="createdAt">Newest First</option>
              <option value="likesCount">Most Popular</option>
              <option value="views">Most Viewed</option>
            </select>
            
            <!-- أيقونة السهم -->
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            
            <!-- أيقونة الفلتر الديناميكية -->
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <!-- أيقونة الساعة للجديد -->
              <svg v-if="filters.sortBy === 'createdAt'" class="w-5 h-5 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              
              <!-- أيقونة النار للشعبية -->
              <svg v-else-if="filters.sortBy === 'likesCount'" class="w-5 h-5 text-red-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
              </svg>
              
              <!-- أيقونة العين للمشاهدات -->
              <svg v-else-if="filters.sortBy === 'views'" class="w-5 h-5 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              
              <!-- أيقونة افتراضية -->
              <svg v-else class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
              </svg>
            </div>
          </div>

            <button 
              @click="loadPosts" 
              :disabled="loading"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Posts Grid -->
        <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <article 
            v-for="(post, index) in posts" 
            :key="post._id" 
            class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            :style="`animation-delay: ${index * 100}ms`"
          >
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Post Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                v-if="post.image" 
                :src="`http://localhost:5000${post.image}`" 
                :alt="post.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg class="w-16 h-16 text-white/80 transform group-hover:scale-110 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
              
              <!-- Status Badge -->
              <div class="absolute top-4 left-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border',
                  post.status === 'published' 
                    ? 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30'
                ]">
                  {{ post.status }}
                </span>
              </div>

              <!-- Like Button Overlay -->
              <button 
                v-if="isAuthenticated"
                @click="toggleLike(post)"
                :disabled="likingPostId === post._id"
                class="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                :class="isLiked(post) ? 'text-red-500 shadow-lg' : 'text-gray-500 hover:text-red-500'"
              >
                <svg v-if="isLiked(post)" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <!-- Post Content -->
            <div class="relative p-6">
              <!-- Author & Date -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <img 
                      v-if="post.author?.avatar" 
                      :src="`http://localhost:5000${post.author.avatar}`"
                      class="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-lg"
                    />
                    <div v-else class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-lg">
                      <span class="text-white text-xs font-bold">
                        {{ post.author?.username?.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">
                      {{ post.author?.username }}
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      {{ formatDate(post.createdAt) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {{ post.title }}
              </h3>

              <!-- Content Preview -->
              <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {{ post.content.substring(0, 120) }}...
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tag in post.tags.slice(0, 2)" 
                  :key="tag"
                  class="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full border border-blue-500/20"
                >
                  #{{ tag }}
                </span>
                <span 
                  v-if="post.tags.length > 2"
                  class="px-3 py-1 text-xs font-medium bg-gray-500/10 text-gray-700 dark:text-gray-300 rounded-full border border-gray-500/20"
                >
                  +{{ post.tags.length - 2 }}
                </span>
              </div>

              <!-- Stats -->
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                    <span>{{ post.likesCount }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <span>{{ post.commentsCount }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <span>{{ post.views }}</span>
                  </div>
                </div>

                <!-- Read More -->
                <router-link 
                  :to="`/posts/${post._id}`"
                  class="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all duration-300"
                >
                  Read More
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <!-- Loading State -->
        <div v-else-if="loading" class="text-center py-20">
          <div class="inline-flex flex-col items-center gap-4">
            <div class="relative">
              <div class="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
              <div class="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full absolute top-0 left-0 animate-spin"></div>
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Loading inspiring stories...
            </p>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="max-w-md mx-auto">
            <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center">
              <svg class="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Stories Yet
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              Be the pioneer! Share your first story and inspire the community.
            </p>
            <router-link 
              v-if="isAuthenticated && user?.role !== 'reader'"
              to="/posts/create" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Create First Story
            </router-link>
          </div>
        </div>

        <!-- Load More -->
        <div v-if="hasMore" class="text-center mt-16">
          <button 
            @click="loadMore"
            :disabled="loading"
            class="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50"
          >
            <span class="flex items-center gap-2 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-semibold">
              {{ loading ? 'Loading Magic...' : 'Load More Stories' }}
              <svg class="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>

     <footer class="relative bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <div class="flex items-center justify-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
            <span class="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MaryBlog
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Where stories come to life. Join our community of writers and readers sharing inspiring content every day.
          </p>
          <div class="flex items-center justify-center space-x-6 text-gray-500 dark:text-gray-400">
            <!-- <span>&copy; 2025 MaryBlog. All rights reserved.</span> -->
              <p class="text-gray-400">
            © 2025 MaryBlog. All rights reserved
            <span class="text-purple-400"> Made with ❤️ for you all </span>
          </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postsAPI, likesAPI } from '@/services/api'
import toastService from '@/services/ToastService'
import socketService from '@/services/socket'

export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      loading: false,
      hasMore: true,
      page: 1,
      limit: 9,
      likingPostId: null,
      userLikes: new Set(),
      filters: {
        sortBy: 'createdAt'
      },
      stats: [
        { value: '10K+', label: 'Active Writers' },
        { value: '50K+', label: 'Stories Shared' },
        { value: '1M+', label: 'Readers Reached' },
        { value: '99%', label: 'Satisfaction Rate' }
      ]
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user', 'darkMode'])
  },
  async mounted() {
  await this.loadPosts()
  if (this.isAuthenticated) {
    await this.loadUserLikes()
  }
  this.setupSocketListeners()
},
beforeUnmount() {
  this.removeSocketListeners()
},
  methods: {



setupSocketListeners() {
  window.addEventListener('socket-postLiked', this.handlePostLiked)
  window.addEventListener('socket-postUnliked', this.handlePostUnliked)
  window.addEventListener('socket-commentLiked', this.handleCommentLiked)
  window.addEventListener('socket-commentUnliked', this.handleCommentUnliked)
   window.addEventListener('socket-newPost', this.handleNewPost) 
   window.addEventListener('socket-commentAdded', this.handleCommentAdded) // إضافة جديدة
  window.addEventListener('socket-commentDeleted', this.handleCommentDeleted) // إضافة جديدة
  window.addEventListener('socket-postViewed', this.handlePostViewed) // إضافة جديدة
  window.addEventListener('socket-postDeleted', this.handlePostDeleted)
},

removeSocketListeners() {
  window.removeEventListener('socket-postLiked', this.handlePostLiked)
  window.removeEventListener('socket-postUnliked', this.handlePostUnliked)
  window.removeEventListener('socket-commentLiked', this.handleCommentLiked)
  window.removeEventListener('socket-commentUnliked', this.handleCommentUnliked)
  window.removeEventListener('socket-newPost', this.handleNewPost)
   window.removeEventListener('socket-commentAdded', this.handleCommentAdded) // إضافة جديدة
  window.removeEventListener('socket-commentDeleted', this.handleCommentDeleted) // إضافة جديدة
  window.removeEventListener('socket-postViewed', this.handlePostViewed) // إضافة جديدة
  window.removeEventListener('socket-postDeleted', this.handlePostDeleted)
},
handleNewPost(event) {
  const newPost = event.detail
  // إضافة المنشور الجديد في بداية القائمة
  this.posts.unshift(newPost)
  
  // إذا تجاوزت القائمة الحد الأقصى، إزالة الأخير
  if (this.posts.length > this.limit) {
    this.posts.pop()
  }
  
  console.log('New post added in real-time:', newPost.title)
},

  handlePostLiked(event) {
  const { postId, userId, likesCount } = event.detail
  const post = this.posts.find(p => p._id === postId)
  if (post) {
    post.likesCount = likesCount
    if (userId === this.user?._id) {
      this.userLikes.add(postId)
    }
  }
},

handlePostUnliked(event) {
  const { postId, userId, likesCount } = event.detail
  const post = this.posts.find(p => p._id === postId)
  if (post) {
    post.likesCount = likesCount
    if (userId === this.user?._id) {
      this.userLikes.delete(postId)
    }
  }
},

handleCommentLiked(event) {
  const { commentId, userId, likesCount } = event.detail
  // تحديث التعليقات إذا كانت موجودة
  this.posts.forEach(post => {
    if (post.comments) {
      const comment = post.comments.find(c => c._id === commentId)
      if (comment) {
        comment.likesCount = likesCount
      }
    }
  })
},

 handlePostDeleted(event) {
    const { postId, deletedBy } = event.detail;
    
    // البحث عن المنشور قبل حذفه لعرض معلوماته
    const deletedPost = this.posts.find(post => post._id === postId);
    
    // إزالة المنشور من القائمة
    this.posts = this.posts.filter(post => post._id !== postId);
    
    console.log(`Post "${deletedPost?.title}" deleted by user ${deletedBy}`);
    
    // إظهار إشعار للمستخدم
    if (deletedPost) {
      toastService.info(`Post "${deletedPost.title}" has been deleted`);
    } else {
      toastService.info('A post has been deleted');
    }
    
    // إذا كانت القائمة فارغة بعد الحذف، إعادة تحميل المنشورات
    if (this.posts.length === 0) {
      this.page = 1;
      this.loadPosts();
    }
  },

handleCommentUnliked(event) {
  const { commentId, userId, likesCount } = event.detail
  // تحديث التعليقات إذا كانت موجودة
  this.posts.forEach(post => {
    if (post.comments) {
      const comment = post.comments.find(c => c._id === commentId)
      if (comment) {
        comment.likesCount = likesCount
      }
    }
  })
},

handleCommentAdded(event) {
  const { postId, comment } = event.detail
  const post = this.posts.find(p => p._id === postId)
  if (post) {
    post.commentsCount = (post.commentsCount || 0) + 1
    console.log(`Comment added to post ${postId}, count: ${post.commentsCount}`)
  }
},

handleCommentDeleted(event) {
  const { postId, commentId } = event.detail
  const post = this.posts.find(p => p._id === postId)
  if (post && post.commentsCount > 0) {
    post.commentsCount -= 1
    console.log(`Comment deleted from post ${postId}, count: ${post.commentsCount}`)
  }
},

handlePostViewed(event) {
  const { postId, views } = event.detail
  const post = this.posts.find(p => p._id === postId)
  if (post) {
    post.views = views
    console.log(`Post ${postId} views updated to: ${views}`)
  }
},

async toggleLike(post) {
  if (!this.isAuthenticated) {
    this.requireLogin()
    return
  }

  this.likingPostId = post._id
  try {
    if (this.isLiked(post)) {
      // إرسال طلب إلغاء الإعجاب عبر Socket أولاً
      socketService.unlikePost(post._id, this.user._id)
      await likesAPI.unlikePost(post._id)
      this.userLikes.delete(post._id)
      // لا تقم بتحديث العدد هنا - سيتولى الـ Socket ذلك
      toastService.success('Post unliked')
    } else {
      // إرسال طلب الإعجاب عبر Socket أولاً
      socketService.likePost(post._id, this.user._id)
      await likesAPI.likePost(post._id)
      this.userLikes.add(post._id)
      // لا تقم بتحديث العدد هنا - سيتولى الـ Socket ذلك
      toastService.success('Post liked! ❤️')
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    const errorMessage = error.response?.data?.message || 'Failed to update like'
    
    if (errorMessage.includes('already liked')) {
      socketService.unlikePost(post._id, this.user._id)
      await likesAPI.unlikePost(post._id)
      this.userLikes.delete(post._id)
      toastService.info('Like removed')
    } else {
      toastService.error(errorMessage)
    }
  } finally {
    this.likingPostId = null
  }
},






    async loadPosts() {
      this.loading = true
      try {
        const params = {
          page: this.page,
          limit: this.limit,
          sortBy: this.filters.sortBy,
          order: 'desc',
          status: 'published'
        }

        const response = await postsAPI.getAll(params)
        if (this.page === 1) {
          this.posts = response.data.data
        } else {
          this.posts = [...this.posts, ...response.data.data]
        }
        
        this.hasMore = response.data.pagination && 
          this.page < response.data.pagination.pages
      } catch (error) {
        console.error('Error loading posts:', error)
        toastService.error('Failed to load inspiring stories')
      } finally {
        this.loading = false
      }
    },

    async loadMore() {
      this.page++
      await this.loadPosts()
    },

    async loadUserLikes() {
      try {
        // يمكن إضافة API لتحميل الإعجابات الخاصة بالمستخدم
      } catch (error) {
        console.error('Error loading user likes:', error)
      }
    },

    isLiked(post) {
      return this.userLikes.has(post._id)
    },

    // async toggleLike(post) {
    //   if (!this.isAuthenticated) {
    //     this.requireLogin()
    //     return
    //   }

    //   this.likingPostId = post._id
    //   try {
    //     if (this.isLiked(post)) {
    //       await likesAPI.unlikePost(post._id)
    //       this.userLikes.delete(post._id)
    //       post.likesCount = Math.max(0, post.likesCount - 1)
    //       toastService.success('Post unliked')
    //     } else {
    //       await likesAPI.likePost(post._id)
    //       this.userLikes.add(post._id)
    //       post.likesCount += 1
    //       toastService.success('Post liked! ❤️')
    //     }
    //   } catch (error) {
    //     console.error('Error toggling like:', error)
    //     const errorMessage = error.response?.data?.message || 'Failed to update like'
        
    //     if (errorMessage.includes('already liked')) {
    //       await likesAPI.unlikePost(post._id)
    //       this.userLikes.delete(post._id)
    //       post.likesCount = Math.max(0, post.likesCount - 1)
    //       toastService.info('Like removed')
    //     } else {
    //       toastService.error(errorMessage)
    //     }
    //   } finally {
    //     this.likingPostId = null
    //   }
    // },

    requireLogin() {
      toastService.warning('Please login to interact with stories')
      this.$router.push('/login')
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    scrollToPosts() {
      const element = document.getElementById('posts')
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  },

  watch: {
    'filters.sortBy'() {
      this.page = 1
      this.loadPosts()
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(20px) rotate(-180deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-gradient-delayed {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite 1s;
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out 0.2s both;
}

.animate-fade-in-up-delayed {
  animation: fade-in-up 1s ease-out 0.4s both;
}

.animate-fade-in-up-more-delayed {
  animation: fade-in-up 1s ease-out 0.6s both;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
}
</style>    