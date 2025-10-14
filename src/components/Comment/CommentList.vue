<template>
  <div class="space-y-6">
    <!-- Comment Form -->
    <div v-if="isAuthenticated" class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
        Share Your Thoughts
      </h3>
      <form @submit.prevent="submitComment" class="relative z-10">
        <textarea
          v-model="commentContent"
          rows="4"
          class="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Share your insights and join the conversation..."
          required
        ></textarea>
        <div class="flex justify-end mt-4">
          <button
            type="submit"
            :disabled="!commentContent.trim() || submitting"
            class="group px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <span class="flex items-center gap-2">
              <span v-if="submitting" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Posting...
              </span>
              <span v-else class="flex items-center gap-2">
                Post Comment
                <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                </svg>
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>

    <!-- Comments List -->
    <div v-if="comments.length > 0" class="space-y-4">
      <div 
        v-for="(comment, index) in comments" 
        :key="comment._id"
        class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        :style="`animation-delay: ${index * 100}ms`"
      >
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="flex items-start justify-between mb-4 relative z-10">
          <div class="flex items-center gap-4">
            <router-link :to="`/users/${comment.author._id}`" class="group flex items-center gap-4">
              <div class="relative">
                <img 
                  v-if="comment.author.avatar" 
                  :src="`http://localhost:5000${comment.author.avatar}`"
                  class="w-12 h-12 rounded-2xl object-cover border-2 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div v-else class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span class="text-white text-sm font-bold">
                    {{ comment.author.username?.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {{ comment.author.username }}
                </h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatDate(comment.createdAt) }}
                </p>
              </div>
            </router-link>
          </div>

          <div class="flex items-center gap-2">
            <button 
              v-if="canDeleteComment(comment)"
              @click="deleteComment(comment._id)"
              class="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-300 transform hover:scale-110 hover:bg-red-500/10"
              :disabled="deletingCommentId === comment._id"
            >
              <svg v-if="deletingCommentId === comment._id" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v4m0 12v4m8-10h-4M6 12H2"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
          {{ comment.content }}
        </p>

        <div class="flex items-center justify-between mt-4 relative z-10">
          <button 
            @click="toggleCommentLike(comment)"
            :disabled="likingCommentId === comment._id"
            :class="[
              'group flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed',
              comment.isLiked 
                ? 'bg-red-500/20 text-red-600 dark:text-red-400 shadow-lg shadow-red-500/20' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400'
            ]"
          >
            <svg v-if="comment.isLiked" class="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span class="font-semibold text-sm">{{ comment.likesCount || 0 }}</span>
          </button>

          <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ formatTimeAgo(comment.createdAt) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="max-w-sm mx-auto">
        <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
          <svg class="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">No comments yet</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Start the conversation and share your insights!</p>
        <div v-if="!isAuthenticated" class="text-sm text-gray-500 dark:text-gray-500">
          <router-link to="/login" class="text-blue-600 dark:text-blue-400 hover:underline">
            Sign in
          </router-link>
          to join the discussion
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { likesAPI } from '@/services/api'
import toastService from '@/services/ToastService'

export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      commentContent: '',
      submitting: false,
      likingCommentId: null,
      deletingCommentId: null,
      userCommentLikes: new Set() // لتتبع التعليقات التي أعجب بها المستخدم
    }
  },
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  },
  watch: {
    comments: {
      immediate: true,
      handler(newComments) {
        // تحديث حالة الإعجاب للتعليقات عند تحميلها
        this.updateCommentLikesStatus(newComments)
      }
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    formatTimeAgo(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffInSeconds = Math.floor((now - date) / 1000)
      
      if (diffInSeconds < 60) return 'just now'
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
      return this.formatDate(dateString)
    },
    canDeleteComment(comment) {
      return this.user && (this.user._id === comment.author._id || this.user.role === 'admin')
    },
    updateCommentLikesStatus(comments) {
      // هنا يمكنك إضافة API لتحميل حالة الإعجابات للمستخدم
      // مؤقتاً، سنفترض أن المستخدم لم يعجب بأي تعليق
      comments.forEach(comment => {
        comment.isLiked = this.userCommentLikes.has(comment._id)
      })
    },
    async submitComment() {
      if (!this.commentContent.trim()) return
      
      this.submitting = true
      try {
        this.$emit('add-comment', {
          content: this.commentContent,
          postId: this.postId
        })
        this.commentContent = ''
      } catch (error) {
        console.error('Error submitting comment:', error)
        toastService.error('Failed to post comment')
      } finally {
        this.submitting = false
      }
    },
    async toggleCommentLike(comment) {
      if (!this.isAuthenticated) {
        toastService.warning('Please login to like comments')
        this.$router.push('/login')
        return
      }

      this.likingCommentId = comment._id
      try {
        if (comment.isLiked) {
          // إلغاء الإعجاب
          await likesAPI.unlikeComment(comment._id)
          comment.isLiked = false
          comment.likesCount = Math.max(0, (comment.likesCount || 0) - 1)
          this.userCommentLikes.delete(comment._id)
          toastService.success('Comment unliked')
        } else {
          // إضافة إعجاب
          await likesAPI.likeComment(comment._id)
          comment.isLiked = true
          comment.likesCount = (comment.likesCount || 0) + 1
          this.userCommentLikes.add(comment._id)
          toastService.success('Comment liked! 💖')
        }
      } catch (error) {
        console.error('Error toggling comment like:', error)
        const errorMessage = error.response?.data?.message || 'Failed to update like'
        
        if (errorMessage.includes('already liked')) {
          // إذا كان المستخدم قد أعجب بالفعل، نقوم بإلغاء الإعجاب
          await likesAPI.unlikeComment(comment._id)
          comment.isLiked = false
          comment.likesCount = Math.max(0, (comment.likesCount || 0) - 1)
          this.userCommentLikes.delete(comment._id)
          toastService.info('Like removed')
        } else {
          toastService.error(errorMessage)
        }
      } finally {
        this.likingCommentId = null
      }
    },
    async deleteComment(commentId) {
      if (!confirm('Are you sure you want to delete this comment?')) return
      
      this.deletingCommentId = commentId
      try {
        this.$emit('delete-comment', commentId)
      } catch (error) {
        console.error('Error deleting comment:', error)
        toastService.error('Failed to delete comment')
      } finally {
        this.deletingCommentId = null
      }
    }
  }
}
</script>

<style scoped>
/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
}
</style>