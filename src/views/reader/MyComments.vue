<template>
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 :class="[
        'text-3xl font-bold mb-2',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        My Comments 💬
      </h1>
      <p :class="[
        'text-lg',
        darkMode ? 'text-gray-300' : 'text-gray-600'
      ]">
        All comments you've posted across different posts
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
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
              Comment Likes
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

      <div :class="[
        'rounded-xl p-6',
        darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
      ]">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Active Discussions
            </p>
            <p :class="[
              'text-2xl font-bold',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ stats.activeDiscussions || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments List -->
    <div :class="[
      'rounded-xl p-6',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <div class="flex items-center justify-between mb-6">
        <h2 :class="[
          'text-xl font-semibold',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          My Comments ({{ myComments.length }})
        </h2>
        
        <div class="flex items-center space-x-4">
          <select 
            v-model="sortBy"
            :class="[
              'px-3 py-2 rounded-lg border text-sm',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-700'
            ]"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="likesCount">Sort by Likes</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p :class="['mt-4', darkMode ? 'text-gray-400' : 'text-gray-500']">
          Loading your comments...
        </p>
      </div>

      <!-- Comments List -->
      <div v-else-if="myComments.length > 0" class="space-y-6">
        <div 
          v-for="comment in myComments" 
          :key="comment._id"
          :class="[
            'p-4 rounded-lg border transition-all',
            darkMode 
              ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
              : 'bg-gray-50 border-gray-200 hover:bg-white'
          ]"
        >
          <!-- Comment Content -->
          <div class="mb-4">
            <p :class="[
              'text-sm mb-3',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              {{ comment.content }}
            </p>
            
            <div class="flex items-center justify-between text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
              <div class="flex items-center space-x-4">
                <span>{{ formatDate(comment.createdAt) }}</span>
                <span class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                  </svg>
                  <span>{{ comment.likesCount }} likes</span>
                </span>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  @click.stop="editComment(comment)"
                  class="text-blue-500 hover:text-blue-600 text-xs font-medium"
                >
                  Edit
                </button>
                <button 
                  @click.stop="deleteComment(comment._id)"
                  class="text-red-500 hover:text-red-600 text-xs font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Post Info -->
          <div 
            :class="[
              'p-3 rounded-lg border cursor-pointer transition-colors',
              darkMode 
                ? 'bg-gray-800 border-gray-600 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            ]"
            @click="$router.push(`/posts/${comment.post._id || comment.post}`)"
          >
            <div class="flex items-center justify-between">
              <div>
                <h4 :class="[
                  'font-medium text-sm mb-1',
                  darkMode ? 'text-white' : 'text-gray-900'
                ]">
                  {{ getPostTitle(comment) }}
                </h4>
                <p class="text-xs" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                  Comment on: {{ getPostTitle(comment) }}
                </p>
              </div>
              <svg class="w-4 h-4" :class="darkMode ? 'text-gray-400' : 'text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <h3 :class="['text-lg font-medium mb-2', darkMode ? 'text-white' : 'text-gray-900']">
          No comments yet
        </h3>
        <p :class="['mb-6', darkMode ? 'text-gray-400' : 'text-gray-500']">
          Start engaging with the community by commenting on posts!
        </p>
        <router-link 
          to="/"
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-colors',
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          ]"
        >
          Explore Posts
        </router-link>
      </div>
    </div>

    <!-- Edit Comment Modal -->
    <div v-if="editingComment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div :class="[
        'rounded-xl p-6 w-full max-w-md',
        darkMode ? 'bg-gray-800' : 'bg-white'
      ]">
        <h3 :class="[
          'text-lg font-semibold mb-4',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          Edit Comment
        </h3>
        
        <textarea
          v-model="editContent"
          rows="4"
          :class="[
            'w-full px-3 py-2 rounded-lg border mb-4 resize-none',
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-700'
          ]"
          placeholder="Edit your comment..."
        ></textarea>
        
        <div class="flex justify-end space-x-3">
          <button
            @click="editingComment = null"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            ]"
          >
            Cancel
          </button>
          <button
            @click="saveComment"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            ]"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :visible="showDeleteDialog"
      :title="deleteDialogConfig.title"
      :message="deleteDialogConfig.message"
      :confirmText="deleteDialogConfig.confirmText"
      :type="deleteDialogConfig.type"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { readerAPI, commentsAPI } from '../../services/api'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import toastService from '@/services/ToastService'

export default {
  name: 'MyComments',
  components: {
    ConfirmDialog
  },
  data() {
    return {
      myComments: [],
      loading: false,
      sortBy: 'createdAt',
      editingComment: null,
      editContent: '',
      stats: {
        totalComments: 0,
        totalLikes: 0,
        activeDiscussions: 0
      },
      showDeleteDialog: false,
      commentToDelete: null,
      deleteDialogConfig: {
        title: 'Delete Comment',
        message: 'Are you sure you want to delete this comment? This action cannot be undone.',
        confirmText: 'Delete',
        type: 'danger'
      }
    }
  },
  computed: {
    ...mapState(['user', 'darkMode'])
  },
  watch: {
    sortBy() {
      this.loadMyComments()
    }
  },
  async mounted() {
    await this.loadMyComments()
    await this.loadStats()
  },
  methods: {
    async loadMyComments() {
      this.loading = true
      try {
        const response = await readerAPI.getMyComments({
          sortBy: this.sortBy,
          order: 'desc'
        })
        
        if (response.data.success) {
          this.myComments = response.data.data
        }
      } catch (error) {
        console.error('Error loading my comments:', error)
        this.generateMockData()
        toastService.error('Failed to load comments. Showing demo data.')
      } finally {
        this.loading = false
      }
    },

    async loadStats() {
      try {
        const response = await readerAPI.getMyStats()
        if (response.data.success) {
          this.stats = response.data.data
        }
      } catch (error) {
        console.error('Error loading stats:', error)
        this.stats = {
          totalComments: this.myComments.length,
          totalLikes: this.myComments.reduce((sum, comment) => sum + (comment.likesCount || 0), 0),
          activeDiscussions: new Set(this.myComments.map(c => c.post._id || c.post)).size
        }
        toastService.warning('Using estimated statistics')
      }
    },

    getPostTitle(comment) {
      if (typeof comment.post === 'object') {
        return comment.post.title || 'Unknown Post'
      }
      return 'Loading post title...'
    },

    editComment(comment) {
      this.editingComment = comment
      this.editContent = comment.content
    },

    async saveComment() {
      if (!this.editingComment || !this.editContent.trim()) return

      try {
        const response = await commentsAPI.updateComment(
          this.editingComment._id, 
          { content: this.editContent }
        )
        
        if (response.data.success) {
          const index = this.myComments.findIndex(c => c._id === this.editingComment._id)
          if (index !== -1) {
            this.myComments[index].content = this.editContent
          }
          this.editingComment = null
          this.editContent = ''
          toastService.success('Comment updated successfully!')
        }
      } catch (error) {
        console.error('Error updating comment:', error)
        toastService.error('Failed to update comment. Please try again.')
      }
    },

    deleteComment(commentId) {
      this.commentToDelete = commentId
      this.showDeleteDialog = true
    },

    async confirmDelete() {
      if (!this.commentToDelete) return

      try {
        const response = await commentsAPI.deleteComment(this.commentToDelete)
        
        if (response.data.success) {
          this.myComments = this.myComments.filter(c => c._id !== this.commentToDelete)
          await this.loadStats()
          toastService.success('Comment deleted successfully!')
        }
      } catch (error) {
        console.error('Error deleting comment:', error)
        toastService.error('Failed to delete comment. Please try again.')
      } finally {
        this.showDeleteDialog = false
        this.commentToDelete = null
      }
    },

    cancelDelete() {
      this.showDeleteDialog = false
      this.commentToDelete = null
      toastService.info('Delete cancelled')
    },

    generateMockData() {
      this.myComments = [
        {
          _id: '1',
          content: 'This is a great article! I learned a lot about Vue 3 Composition API.',
          likesCount: 5,
          createdAt: new Date().toISOString(),
          post: {
            _id: '1',
            title: 'Understanding Vue 3 Composition API'
          }
        },
        {
          _id: '2',
          content: 'Thanks for sharing these Node.js best practices. Very helpful!',
          likesCount: 2,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          post: {
            _id: '2',
            title: 'Node.js Best Practices 2024'
          }
        }
      ]
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>