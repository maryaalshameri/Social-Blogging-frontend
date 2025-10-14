
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
            Comments Management
          </h1>
          <p :class="[
            'text-lg',
            darkMode ? 'text-gray-300' : 'text-gray-600'
          ]">
            Moderate and manage user comments
          </p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div :class="[
      'rounded-xl p-6 mb-8',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            placeholder="Search comments..."
          >
        </div>
        <div>
          <label :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Status
          </label>
          <select
            v-model="filters.status"
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            ]"
          >
            <option value="">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
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
            <option value="createdAt">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Comments List -->
    <div class="space-y-6">
      <div
        v-for="comment in comments"
        :key="comment._id"
        :class="[
          'rounded-xl p-6 transition-all',
          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white shadow border border-gray-200 hover:border-gray-300'
        ]"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <img 
              v-if="comment.author?.avatar" 
              :src="`http://localhost:5000${comment.author.avatar}`" 
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
                {{ comment.author?.username?.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <p :class="[
                'text-sm font-medium',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">
                {{ comment.author?.username }}
              </p>
              <p :class="[
                'text-xs',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                {{ formatDate(comment.createdAt) }}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span :class="[
              'px-2 py-1 text-xs rounded-full',
              comment.isApproved 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            ]">
              {{ comment.isApproved ? 'Approved' : 'Pending' }}
            </span>
          </div>
        </div>

        <!-- Comment Content -->
        <div class="mb-4">
          <p :class="[
            'text-sm mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            {{ comment.content }}
          </p>
          
          <!-- Related Post -->
          <div 
            v-if="comment.post"
            @click="$router.push(`/posts/${comment.post._id}`)"
            :class="[
              'p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all mb-3',
              darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-white'
            ]"
          >
            <p :class="[
              'text-xs font-medium mb-1',
              darkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              Comment on:
            </p>
            <p :class="[
              'text-sm font-medium',
              darkMode ? 'text-white' : 'text-gray-900'
            ]">
              {{ comment.post.title }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
              </svg>
              <span>{{ comment.likesCount || 0 }}</span>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              v-if="!comment.isApproved"
              @click="approveComment(comment)"
              :class="[
                'px-3 py-1 text-xs rounded transition-colors',
                darkMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-100 hover:bg-green-200 text-green-700'
              ]"
            >
              Approve
            </button>
            <button
              @click="editComment(comment)"
              :class="[
                'px-3 py-1 text-xs rounded transition-colors',
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
              ]"
            >
              Edit
            </button>
            <button
              @click="showDeleteDialog(comment)"
              :class="[
                'px-3 py-1 text-xs rounded transition-colors',
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
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p :class="['mt-4', darkMode ? 'text-gray-400' : 'text-gray-500']">Loading comments...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="comments.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <h3 :class="['mt-2 text-sm font-medium', darkMode ? 'text-gray-300' : 'text-gray-900']">
        No comments found
      </h3>
      <p :class="['mt-1 text-sm', darkMode ? 'text-gray-400' : 'text-gray-500']">
        All comments are moderated and displayed here
      </p>
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :visible="showDeleteConfirm"
      title="Delete Comment"
      :message="`Are you sure you want to delete this comment? This action cannot be undone.`"
      confirmText="Delete"
      type="danger"
      @confirm="deleteComment"
      @cancel="hideDeleteDialog"
    />

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
        
        <div class="space-y-4">
          <div>
            <label :class="[
              'block text-sm font-medium mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              Comment
            </label>
            <textarea
              v-model="editingComment.content"
              rows="4"
              :class="[
                'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none',
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              ]"
            ></textarea>
          </div>
          
          <div class="flex items-center">
            <input
              v-model="editingComment.isApproved"
              type="checkbox"
              id="approveComment"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <label for="approveComment" :class="[
              'ml-2 text-sm',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              Approve comment
            </label>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="editingComment = null"
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
            @click="saveComment"
            :class="[
              'px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors'
            ]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { commentsAPI } from '@/services/api'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import ToastService from '@/services/ToastService'

export default {
  name: 'AdminComments',
  components: {
    ConfirmDialog
  },
  data() {
    return {
      comments: [],
      loading: false,
      editingComment: null,
      commentToDelete: null,
      showDeleteConfirm: false,
      filters: {
        search: '',
        status: '',
        sortBy: 'createdAt'
      }
    }
  },
  computed: {
    ...mapState(['darkMode'])
  },
  watch: {
    filters: {
      handler() {
        this.loadComments()
      },
      deep: true
    }
  },
  mounted() {
    this.loadComments()
  },
  methods: {
   async loadComments() {
  this.loading = true
  try {
    const params = {
      ...this.filters
    }

    const response = await commentsAPI.getAll(params)
    if (response.data.success) {
      this.comments = response.data.data
      // إصلاح مشكلة pagination
      this.pagination = {
        total: response.data.pagination?.total || response.data.data.length,
        page: response.data.pagination?.page || 1,
        pages: response.data.pagination?.pages || 1
      }
    } else {
      ToastService.error('Failed to load comments')
    }
  } catch (error) {
    console.error('Error loading comments:', error)
    ToastService.error('Failed to load comments: ' + (error.response?.data?.message || error.message))
  } finally {
    this.loading = false
  }
},

    async approveComment(comment) {
      try {
        const response = await commentsAPI.update(comment._id, { 
          isApproved: true 
        })

        if (response.data.success) {
          comment.isApproved = true
          ToastService.success('Comment approved successfully!')
        } else {
          ToastService.error('Failed to approve comment')
        }
      } catch (error) {
        console.error('Error approving comment:', error)
        ToastService.error('Failed to approve comment')
      }
    },

    editComment(comment) {
      this.editingComment = { ...comment }
    },

    async saveComment() {
      try {
        const response = await commentsAPI.update(this.editingComment._id, {
          content: this.editingComment.content,
          isApproved: this.editingComment.isApproved
        })

        if (response.data.success) {
          // Update local comment data
          const index = this.comments.findIndex(c => c._id === this.editingComment._id)
          if (index !== -1) {
            this.comments[index] = { ...this.comments[index], ...this.editingComment }
          }
          this.editingComment = null
          ToastService.success('Comment updated successfully!')
        } else {
          ToastService.error('Failed to update comment')
        }
      } catch (error) {
        console.error('Error updating comment:', error)
        ToastService.error('Failed to update comment')
      }
    },

    showDeleteDialog(comment) {
      this.commentToDelete = comment
      this.showDeleteConfirm = true
    },

    hideDeleteDialog() {
      this.commentToDelete = null
      this.showDeleteConfirm = false
    },

    async deleteComment() {
      if (!this.commentToDelete) return

      try {
        const response = await commentsAPI.delete(this.commentToDelete._id)

        if (response.data.success) {
          // Remove from local comments
          this.comments = this.comments.filter(c => c._id !== this.commentToDelete._id)
          ToastService.success('Comment deleted successfully!')
        } else {
          ToastService.error('Failed to delete comment')
        }
      } catch (error) {
        console.error('Error deleting comment:', error)
        ToastService.error('Failed to delete comment')
      } finally {
        this.hideDeleteDialog()
      }
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
