<template>
  <div class="max-w-7xl mx-auto">
    <!-- Welcome Header -->
    <div class="mb-8" v-if="user">
      <h1 :class="[
        'text-3xl font-bold mb-2',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        Author Dashboard - {{ user.username }} ✍️
      </h1>
      <p :class="[
        'text-lg',
        darkMode ? 'text-gray-300' : 'text-gray-600'
      ]">
        Manage your posts and track your performance
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p :class="['mt-4', darkMode ? 'text-gray-300' : 'text-gray-600']">
        Loading your dashboard...
      </p>
    </div>

    <!-- Error State -->
    <div v-else-if="!user" class="text-center py-12">
      <div :class="['text-red-500 mb-4', darkMode ? 'text-red-400' : 'text-red-600']">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      <h3 :class="['text-xl font-medium mb-2', darkMode ? 'text-white' : 'text-gray-900']">
        Authentication Required
      </h3>
      <p :class="['mb-6', darkMode ? 'text-gray-400' : 'text-gray-500']">
        Please log in to access the dashboard
      </p>
      <router-link 
        to="/login" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Login
      </router-link>
    </div>

    <!-- Content when user is loaded -->
    <div v-else>
      <!-- Author Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- My Posts -->
        <div :class="[
          'rounded-xl p-6',
          darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
        ]">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p :class="[
                'text-sm font-medium',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                My Posts
              </p>
              <p :class="[
                'text-2xl font-bold',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalPosts || 0 }}
              </p>
            </div>
          </div>
        </div>

        <!-- My Likes -->
        <div :class="[
          'rounded-xl p-6',
          darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
        ]">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p :class="[
                'text-sm font-medium',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Total Likes
              </p>
              <p :class="[
                'text-2xl font-bold',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalLikes || 0 }}
              </p>
            </div>
          </div>
        </div>

        <!-- My Comments -->
        <div :class="[
          'rounded-xl p-6',
          darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
        ]">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p :class="[
                'text-sm font-medium',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Total Comments
              </p>
              <p :class="[
                'text-2xl font-bold',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalComments || 0 }}
              </p>
            </div>
          </div>
        </div>

        <!-- My Views -->
        <div :class="[
          'rounded-xl p-6',
          darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
        ]">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p :class="[
                'text-sm font-medium',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Total Views
              </p>
              <p :class="[
                'text-2xl font-bold',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ stats.totalViews || 0 }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Tabs -->
      <div class="mb-8">
        <div class="border-b" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in statusTabs"
              :key="tab.id"
              @click="activeStatusTab = tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeStatusTab === tab.id
                  ? tab.activeClass
                  : darkMode
                    ? 'border-transparent text-gray-400 hover:text-gray-300'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ tab.name }}
              <span :class="[
                'ml-2 py-0.5 px-2 text-xs rounded-full',
                activeStatusTab === tab.id
                  ? tab.badgeActiveClass
                  : darkMode
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-100 text-gray-500'
              ]">
                {{ getStatusTabCount(tab.id) }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Status Content -->
      <div class="mb-8">
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="post in filteredPosts" 
            :key="post._id"
            :class="[
              'rounded-lg border p-4 transition-all hover:shadow-md',
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            ]"
          >
            <!-- Post Header -->
            <div class="flex items-start justify-between mb-3">
              <h3 
                @click="$router.push(`/posts/${post._id}`)"
                :class="[
                  'font-medium hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 flex-1',
                  darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900'
                ]"
              >
                {{ post.title }}
              </h3>
              <div class="flex items-center space-x-2 ml-2">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full font-medium',
                  post.status === 'published' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : post.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                ]">
                  {{ post.status }}
                </span>
              </div>
            </div>

            <!-- Post Image -->
            <div v-if="post.image" class="mb-3">
              <img 
                 :src="`http://localhost:5000${post.image}`" 
                :alt="post.title"
                class="w-full h-32 object-cover rounded-lg cursor-pointer"
                @click="$router.push(`/posts/${post._id}`)"
              />
            </div>

            <!-- Post Content Preview -->
            <p class="text-sm mb-3 line-clamp-2" :class="darkMode ? 'text-gray-300' : 'text-gray-600'">
              {{ post.content?.substring(0, 100) }}...
            </p>

            <!-- Post Stats -->
            <div class="flex items-center justify-between text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
              <div class="flex items-center space-x-3">
                <span class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <span>{{ post.views || 0 }}</span>
                </span>
                <span class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                  </svg>
                  <span>{{ post.likesCount || 0 }}</span>
                </span>
                <span class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>{{ post.commentsCount || 0 }}</span>
                </span>
              </div>
              <span>{{ formatDate(post.createdAt) }}</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center justify-between mt-4 pt-3 border-t" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
              <div class="flex space-x-2">
                <button 
                  @click="editPost(post)"
                  :class="[
                    'flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors',
                    darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  ]"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  <span>Edit</span>
                </button>

                <button 
                  v-if="post.status === 'draft'"
                  @click="publishPost(post)"
                  :class="[
                    'flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors',
                    darkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  ]"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Publish</span>
                </button>

                <button 
                  v-if="post.status === 'published'"
                  @click="unpublishPost(post)"
                  :class="[
                    'flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors',
                    darkMode 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                      : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  ]"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Unpublish</span>
                </button>

                <button 
                  v-if="post.status === 'published' || post.status === 'draft'"
                  @click="archivePost(post)"
                  :class="[
                    'flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors',
                    darkMode 
                      ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  ]"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                  </svg>
                  <span>Archive</span>
                </button>
              </div>

              <button 
                @click="confirmDeletePost(post)"
                :class="[
                  'p-1 rounded transition-colors',
                  darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
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

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div :class="['mb-4', darkMode ? 'text-gray-500' : 'text-gray-400']">
            <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <h3 :class="['text-xl font-medium mb-2', darkMode ? 'text-white' : 'text-gray-900']">
            No {{ activeStatusTab }} posts
          </h3>
          <p :class="['mb-6', darkMode ? 'text-gray-400' : 'text-gray-500']">
            {{ getEmptyStateMessage(activeStatusTab) }}
          </p>
          <router-link 
            v-if="activeStatusTab === 'draft' || activeStatusTab === 'all'"
            to="/posts/create" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Create New Post
          </router-link>
        </div>
      </div>

      <!-- Recent Comments Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- يمكنك إضافة محتوى إضافي هنا إذا لزم الأمر -->
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div :class="[
            'rounded-xl p-6',
            darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
          ]">
            <h3 :class="[
              'text-lg font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              Quick Actions
            </h3>
            <div class="space-y-3">
              <router-link 
                to="/posts/create"
                :class="[
                  'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Write New Post</span>
              </router-link>
              
              <router-link 
                to="/profile"
                :class="[
                  'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span>Edit Profile</span>
              </router-link>

              <button 
                @click="refreshData"
                :disabled="loading"
                :class="[
                  'flex items-center space-x-3 p-3 rounded-lg transition-colors w-full text-left',
                  loading
                    ? 'opacity-50 cursor-not-allowed'
                    : '',
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                <svg class="w-5 h-5" :class="{'animate-spin': loading}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>Refresh Data</span>
              </button>
            </div>
          </div>

          <!-- Recent Comments on My Posts -->
          <div :class="[
            'rounded-xl p-6',
            darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
          ]">
            <h3 :class="[
              'text-lg font-semibold mb-4',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              Recent Comments
            </h3>
            <div v-if="recentComments.length > 0" class="space-y-3">
              <div 
                v-for="comment in recentComments" 
                :key="comment._id"
                class="p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all"
                :class="darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'"
                @click="$router.push(`/posts/${comment.post?._id || comment.post}`)"
              >
                <p class="text-sm mb-2 line-clamp-2" :class="darkMode ? 'text-gray-300' : 'text-gray-700'">
                  "{{ comment.content }}"
                </p>
                <div class="flex justify-between items-center text-xs" :class="darkMode ? 'text-gray-500' : 'text-gray-400'">
                  <span>By {{ comment.author?.username || 'Unknown' }}</span>
                  <span>{{ formatTimeAgo(comment.createdAt) }}</span>
                </div>
                <div class="mt-1 text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                  On: {{ comment.post?.title || 'Post' }}
                </div>
              </div>
            </div>
            <div v-else class="text-center py-4">
              <p :class="[
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                No comments on your posts yet
              </p>
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
import { postsAPI, commentsAPI, authAPI } from '../services/api'
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
      }
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
  },
  beforeUnmount() {
    this.cleanupSocketListeners()
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
        
        const postsResponse = await postsAPI.getAll({ 
          author: this.userId,
          
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
    }
  }
}
</script>