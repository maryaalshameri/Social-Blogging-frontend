
<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 :class="[
            'text-3xl font-bold mb-2',
            darkMode ? 'text-white' : 'text-gray-900'
          ]">
            Posts Management
          </h1>
          <p :class="[
            'text-lg',
            darkMode ? 'text-gray-300' : 'text-gray-600'
          ]">
            Manage and moderate all blog posts
          </p>
        </div>
      </div>
    </div>

    <!-- Status Tabs -->
    <div :class="[
      'rounded-xl p-6 mb-8',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <div class="flex space-x-1 p-1 rounded-lg" :class="darkMode ? 'bg-gray-700' : 'bg-gray-100'">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
            activeTab === tab.id
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 shadow'
              : darkMode
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          {{ tab.name }} ({{ getTabCount(tab.id) }})
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div :class="[
      'rounded-xl p-6 mb-8',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Search
          </label>
          <input
            v-model="filters.search"
            type="text"
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            ]"
            placeholder="Search posts..."
          >
        </div>
        <div>
          <label :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Author
          </label>
          <select
            v-model="filters.author"
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            ]"
          >
            <option value="">All Authors</option>
            <option v-for="author in authors" :key="author._id" :value="author._id">
              {{ author.username }}
            </option>
          </select>
        </div>
        <div>
          <label :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Sort By
          </label>
          <select
            v-model="filters.sortBy"
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            ]"
          >
            <option value="createdAt">Created Date</option>
            <option value="updatedAt">Updated Date</option>
            <option value="title">Title</option>
            <option value="likesCount">Likes</option>
            <option value="commentsCount">Comments</option>
          </select>
        </div>
        <div>
          <label :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Order
          </label>
          <select
            v-model="filters.order"
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            ]"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Posts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="post in posts"
        :key="post._id"
        :class="[
          'rounded-xl p-6 transition-all cursor-pointer hover:shadow-lg',
          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white shadow border border-gray-200 hover:border-gray-300'
        ]"
        @click="viewPost(post)"
      >
        <!-- Post Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <img 
              v-if="post.author?.avatar" 
              :src="`http://localhost:5000${post.author.avatar}`" 
              class="w-8 h-8 rounded-full object-cover"
            />
            <div v-else :class="[
              'w-8 h-8 rounded-full flex items-center justify-center',
              darkMode ? 'bg-gray-600' : 'bg-gray-300'
            ]">
              <span :class="[
                'text-xs font-medium',
                darkMode ? 'text-gray-300' : 'text-gray-600'
              ]">
                {{ post.author?.username?.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <p :class="[
                'text-sm font-medium',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ post.author?.username }}
              </p>
              <p :class="[
                'text-xs',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                {{ formatDate(post.createdAt) }}
              </p>
            </div>
          </div>
          <span :class="[
            'px-2 py-1 text-xs rounded-full',
            post.status === 'published' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : post.status === 'draft'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          ]">
            {{ post.status }}
          </span>
        </div>

        <!-- Post Content -->
        <h3 :class="[
          'font-semibold mb-2 line-clamp-2',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          {{ post.title }}
        </h3>
        <p :class="[
          'text-sm mb-4 line-clamp-3',
          darkMode ? 'text-gray-300' : 'text-gray-600'
        ]">
          {{ post.content }}
        </p>

        <!-- Post Stats -->
        <div class="flex items-center justify-between text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
              <span>{{ post.likesCount || 0 }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span>{{ post.commentsCount || 0 }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click.stop="editPost(post)"
              :class="[
                'px-2 py-1 text-xs rounded transition-colors',
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
              ]"
            >
              Edit
            </button>
            <button
              @click.stop="deletePost(post)"
              :class="[
                'px-2 py-1 text-xs rounded transition-colors',
                darkMode 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-100 hover:bg-red-200 text-red-700'
              ]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12 col-span-full">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p :class="['mt-4', darkMode ? 'text-gray-400' : 'text-gray-500']">Loading posts...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="posts.length === 0" class="text-center py-12 col-span-full">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
      <h3 :class="['mt-2 text-sm font-medium', darkMode ? 'text-gray-300' : 'text-gray-900']">
        No posts found
      </h3>
      <p :class="['mt-1 text-sm', darkMode ? 'text-gray-400' : 'text-gray-500']">
        Try adjusting your search or filter
      </p>
    </div>

    <!-- Pagination -->
    <div v-if="posts.length > 0" class="col-span-full">
      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center justify-between">
          <div>
            <p :class="['text-sm', darkMode ? 'text-gray-400' : 'text-gray-700']">
              Showing <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span> to 
              <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span> of 
              <span class="font-medium">{{ pagination.total }}</span> results
            </p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pagination.page === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page * pagination.limit >= pagination.total"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pagination.page * pagination.limit >= pagination.total
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Post Modal -->
    <div v-if="editingPost" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div :class="[
        'rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto',
        darkMode ? 'bg-gray-800' : 'bg-white'
      ]">
        <h3 :class="[
          'text-lg font-semibold mb-4',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          Edit Post
        </h3>
        
        <div class="space-y-4">
          <div>
            <label :class="[
              'block text-sm font-medium mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              Title
            </label>
            <input
              v-model="editingPost.title"
              type="text"
              :class="[
                'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              ]"
            >
          </div>
          
          <div>
            <label :class="[
              'block text-sm font-medium mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              Content
            </label>
            <textarea
              v-model="editingPost.content"
              rows="6"
              :class="[
                'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none',
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              ]"
            ></textarea>
          </div>
          
          <div>
            <label :class="[
              'block text-sm font-medium mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              Status
            </label>
            <select
              v-model="editingPost.status"
              :class="[
                'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              ]"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="editingPost = null"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            Cancel
          </button>
          <button
            @click="savePost"
            :class="[
              'px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors'
            ]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
      <ConfirmDialog
    :visible="showDeleteConfirm"
    title="Delete Post"
    :message="`Are you sure you want to delete post '${postToDelete?.title}'? This action cannot be undone.`"
    confirmText="Delete"
    type="danger"
    @confirm="confirmDeletePost"
    @cancel="hideDeleteDialog"
  />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postsAPI, usersAPI } from '@/services/api'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import ToastService from '@/services/ToastService'

export default {
  name: 'AdminPosts',
   components: {
    ConfirmDialog 
  },
  data() {
    return {
      posts: [],
      authors: [],
      loading: false,
      editingPost: null,
      activeTab: 'all',
      postToDelete: null, 
      showDeleteConfirm: false, 
      tabs: [
        { id: 'all', name: 'All Posts' },
        { id: 'published', name: 'Published' },
        { id: 'draft', name: 'Drafts' },
        { id: 'archived', name: 'Archived' }
      ],
      filters: {
        search: '',
        author: '',
        sortBy: 'createdAt',
        order: 'desc'
      },
      pagination: {
        page: 1,
        limit: 9,
        total: 0
      }
    }
  },
  computed: {
    ...mapState(['darkMode'])
  },
  watch: {
    activeTab() {
      this.pagination.page = 1
      this.loadPosts()
    },
    filters: {
      handler() {
        this.pagination.page = 1
        this.loadPosts()
      },
      deep: true
    },
    'pagination.page'() {
      this.loadPosts()
    }
  },
  async mounted() {
    await this.loadAuthors()
    this.loadPosts()
  },
  methods: {
    async loadPosts() {
      this.loading = true
      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...this.filters
        }

        // Add status filter based on active tab
        if (this.activeTab !== 'all') {
          params.status = this.activeTab
        }

        const response = await postsAPI.getAll(params)
        if (response.data.success) {
          this.posts = response.data.data
          this.pagination.total = response.data.total
          this.pagination.total = response.data.pagination?.total || response.data.total || this.posts.length

        }
      } catch (error) {
        console.error('Error loading posts:', error)
        // Fallback to mock data for demo
        this.generateMockPosts()
      } finally {
        this.loading = false
      }
    },

    async loadAuthors() {
      try {
        const response = await usersAPI.getAll({ role: 'author', limit: 50 })
        if (response.data.success) {
          this.authors = response.data.data
        }
      } catch (error) {
        console.error('Error loading authors:', error)
      }
    },

    viewPost(post) {
      this.$router.push(`/posts/${post._id}`)
    },

    editPost(post) {
      this.editingPost = { ...post }
    },

    async savePost() {
      try {
        const response = await postsAPI.update(this.editingPost._id, {
          title: this.editingPost.title,
          content: this.editingPost.content,
          status: this.editingPost.status
          
        })

        if (response.data.success) {
          // Update local post data
          const index = this.posts.findIndex(p => p._id === this.editingPost._id)
          if (index !== -1) {
            this.posts[index] = { ...this.posts[index], ...response.data.data }
            ToastService.success('Post update successfully!')
          }
          this.editingPost = null
        }
      } catch (error) {
        console.error('Error updating post:', error)
      }
    },

    deletePost(post) {
      this.postToDelete = post
      this.showDeleteConfirm = true
    },

    hideDeleteDialog() {
      this.postToDelete = null
      this.showDeleteConfirm = false
    },

    async confirmDeletePost() {
      if (!this.postToDelete) return

      try {
        const response = await postsAPI.delete(this.postToDelete._id)
        if (response.data.success) {
          // Remove from local posts
          this.posts = this.posts.filter(p => p._id !== this.postToDelete._id)
          ToastService.success('Post deleted successfully!')
          
          // Update pagination
          this.pagination.total = Math.max(0, this.pagination.total - 1)
          
          // If no posts on current page, go to previous page
          if (this.posts.length === 0 && this.pagination.page > 1) {
            this.pagination.page--
            this.loadPosts()
          }
        } else {
          ToastService.error('Failed to delete post')
        }
      } catch (error) {
        console.error('Error deleting post:', error)
        ToastService.error('Failed to delete post')
      } finally {
        this.hideDeleteDialog()
      }
    },

    getTabCount(tabId) {
      // This would normally come from API stats
      // For now, we'll filter local posts
      if (tabId === 'all') return this.pagination.total
      return this.posts.filter(post => post.status === tabId).length
    },

    previousPage() {
      if (this.pagination.page > 1) {
        this.pagination.page--
      }
    },

    nextPage() {
      if (this.pagination.page * this.pagination.limit < this.pagination.total) {
        this.pagination.page++
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    generateMockPosts() {
      // Mock data for demo
      this.posts = [
        {
          _id: '1',
          title: 'Getting Started with Vue.js',
          content: 'Learn the basics of Vue.js framework and how to build modern web applications...',
          status: 'published',
          likesCount: 15,
          commentsCount: 8,
          author: {
            _id: '1',
            username: 'admin_user',
            avatar: null
          },
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Advanced React Patterns',
          content: 'Deep dive into advanced React patterns and best practices for large-scale applications...',
          status: 'draft',
          likesCount: 0,
          commentsCount: 0,
          author: {
            _id: '2',
            username: 'author_john',
            avatar: null
          },
          createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          _id: '3',
          title: 'Node.js Performance Optimization',
          content: 'Tips and techniques for optimizing Node.js application performance...',
          status: 'archived',
          likesCount: 23,
          commentsCount: 12,
          author: {
            _id: '1',
            username: 'admin_user',
            avatar: null
          },
          createdAt: new Date(Date.now() - 172800000).toISOString()
        }
      ]
      this.pagination.total = this.posts.length
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
</style>
