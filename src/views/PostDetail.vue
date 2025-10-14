<template>
  <div class="min-h-screen">
    <!-- Animated Background -->
    <div class="fixed inset-0 -z-10 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/10"></div>
      
      <!-- Animated Orbs -->
      <div class="absolute top-1/4 -left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-float dark:bg-purple-900/20"></div>
      <div class="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-float-delayed dark:bg-blue-900/20"></div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8" v-if="post">
      <!-- Post Header -->
      <article class="article-container prevent-squish relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover-lift mb-8 overflow-hidden">        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        <!-- Post Meta -->
        <div class="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4">
              <router-link :to="`/users/${post.author._id}`" class="group flex items-center gap-4">
                <div class="relative">
                  <img 
                    v-if="post.author.avatar" 
                    :src="`http://localhost:5000${post.author.avatar}`"
                    class="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div v-else class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span class="text-white text-lg font-bold">
                      {{ post.author.username?.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"></div>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {{ post.author.username }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(post.createdAt) }}
                  </p>
                </div>
              </router-link>
            </div>
            
            <!-- استبدله بهذا التصميم المحسّن -->
            <div v-if="isAuthor" class="flex items-center gap-3 ml-auto">
              <!-- زر التعديل -->
              <router-link 
                :to="`/posts/${post._id}/edit`"
                class="group relative px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 overflow-hidden"
              >
                <!-- تأثير الخلفية المتحرك -->
                <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span class="relative flex items-center gap-2">
                  <!-- أيقونة التعديل المحسنة -->
                  <svg class="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Story
                </span>
              </router-link>

              <!-- زر الحذف -->
              <button 
                @click="showDeleteConfirm = true"
                class="group relative px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 overflow-hidden"
              >
                <!-- تأثير الخلفية المتحرك -->
                <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span class="relative flex items-center gap-2">
                  <!-- أيقونة الحذف المحسنة -->
                  <svg class="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Delete
                </span>
              </button>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
            {{ post.title }}
          </h1>

          <!-- Tags -->
          <div class="flex flex-wrap gap-3 mb-6">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="px-4 py-2 text-sm font-semibold bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-105"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Post Stats -->
          <div class="flex items-center gap-8 text-sm">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div class="p-2 bg-blue-500/10 rounded-lg">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <div>
                <div class="font-bold text-gray-900 dark:text-white text-lg">{{ post.views }}</div>
                <div class="text-xs">views</div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div class="p-2 bg-red-500/10 rounded-lg">
                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
              </div>
              <div>
                <div class="font-bold text-gray-900 dark:text-white text-lg">{{ post.likesCount }}</div>
                <div class="text-xs">likes</div>
              </div>
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <div class="p-2 bg-green-500/10 rounded-lg">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div>
                <div class="font-bold text-gray-900 dark:text-white text-lg">{{ post.commentsCount }}</div>
                <div class="text-xs">comments</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div v-if="post.image" class="p-8">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              :src="`http://localhost:5000${post.image}`"
              :alt="post.title"
              class="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        <!-- Post Content -->
        <div class="p-8">
          <div class="prose prose-lg max-w-none dark:prose-invert">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
              {{ post.content }}
            </p>
          </div>
        </div>

        <!-- Post Actions -->
        <div class="p-8 border-t border-gray-200/50 dark:border-gray-700/50">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <!-- Like Button -->
 <button 
  @click="toggleLike"
  :disabled="likeLoading"
  class="action-button group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105"
  :class="[
    isLiked 
      ? 'bg-red-500/20 text-red-600 dark:text-red-400 shadow-lg shadow-red-500/20' 
      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400',
    likeLoading ? 'opacity-50 cursor-not-allowed' : ''
  ]"
>
  <!-- أيقونة اللايك -->
  <svg v-if="isLiked" class="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
  </svg>
  <svg v-else class="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
  </svg>
  <span class="font-semibold">{{ post.likesCount }}</span>
</button>

              <!-- Share Button -->
<button 
  @click="sharePost"
  class="action-button group flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400"
>
  <svg class="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
  </svg>
  <span class="font-semibold">Share</span>
</button>
            </div>

            <!-- Bookmark Button -->
<button 
  @click="toggleBookmark"
  class="action-button group p-3 rounded-2xl transition-all duration-300 transform hover:scale-110"
  :class="[
    isBookmarked 
      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/20' 
      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400'
  ]"
>
  <svg class="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
  </svg>
</button>
          </div>
        </div>
      </article>

      <!-- Comments Section -->
      <div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        <div class="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
          <h2 class="text-3xl font-black text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
            Community Discussion
            <span class="text-2xl text-gray-500 dark:text-gray-400 ml-2">({{ post.commentsCount }})</span>
          </h2>
        </div>
        
        <div class="p-8">
          <CommentList 
            :comments="comments"
            :postId="post._id"
            @add-comment="addComment"
            @delete-comment="deleteComment"
            @toggle-comment-like="toggleCommentLike"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="max-w-4xl mx-auto text-center py-20">
      <div class="inline-flex flex-col items-center gap-6">
        <div class="relative">
          <div class="w-20 h-20 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          <div class="w-20 h-20 border-4 border-transparent border-t-blue-500 rounded-full absolute top-0 left-0 animate-spin"></div>
        </div>
        <div>
          <p class="text-xl text-gray-600 dark:text-gray-400 font-semibold mb-2">
            Loading Amazing Content...
          </p>
          <p class="text-gray-500 dark:text-gray-500">
            Preparing an incredible reading experience for you
          </p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto text-center py-20">
      <div class="max-w-md mx-auto">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-3xl flex items-center justify-center">
          <svg class="w-12 h-12 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Story Not Found
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {{ error }}
        </p>
        <router-link 
          to="/" 
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Home
        </router-link>
      </div>
    </div>

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog 
      :visible="showDeleteConfirm"
      title="Delete Amazing Story"
      message="Are you sure you want to delete this incredible story? This action cannot be undone and all comments will be lost forever."
      confirm-text="Yes, Delete Forever"
      type="danger"
      @confirm="deletePost"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postsAPI, commentsAPI, likesAPI } from '../services/api'
import CommentList from '../components/Comment/CommentList.vue'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import toastService from '../services/ToastService'

export default {
  name: 'PostDetail',
  components: {
    CommentList,
    ConfirmDialog
  },
  data() {
    return {
      post: null,
      comments: [],
      loading: true,
      error: '',
      isLiked: false,
      isBookmarked: false,
      likeLoading: false,
      showDeleteConfirm: false,
      deleting: false
    }
  },
  computed: {
    ...mapState(['user', 'darkMode']),
    isAuthor() {
      // إصلاح المشكلة: تحقق من أن post.author موجود وتحويل _id إلى string
      return this.user && this.post && this.post.author && 
             this.user._id.toString() === this.post.author._id.toString()
    }
  },
  async mounted() {
    await this.loadPost()
    await this.loadComments()
    await this.checkIfLiked()
  },
  methods: {
    async loadPost() {
      this.loading = true
      try {
        const response = await postsAPI.getById(this.$route.params.id)
        this.post = response.data.data
        
        // تأكد من أن البيانات موجودة
        console.log('Post loaded:', this.post)
        console.log('Post author:', this.post.author)
        console.log('Current user:', this.user)
        console.log('Is author:', this.isAuthor)
      } catch (error) {
        this.error = error.response?.data?.message || 'Post not found'
        console.error('Error loading post:', error)
      } finally {
        this.loading = false
      }
    },
    async loadComments() {
      try {
        const response = await commentsAPI.getByPost(this.$route.params.id)
        this.comments = response.data.data
      } catch (error) {
        console.error('Error loading comments:', error)
      }
    },
    async checkIfLiked() {
      if (!this.user) return
      
      try {
        this.isLiked = false
      } catch (error) {
        console.error('Error checking like status:', error)
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    async toggleLike() {
      if (!this.user) {
        toastService.warning('Please login to like posts')
        this.$router.push('/login')
        return
      }

      this.likeLoading = true
      try {
        if (this.isLiked) {
          await likesAPI.unlikePost(this.post._id)
          this.post.likesCount = Math.max(0, this.post.likesCount - 1)
          this.isLiked = false
          toastService.success('Post unliked')
        } else {
          await likesAPI.likePost(this.post._id)
          this.post.likesCount++
          this.isLiked = true
          toastService.success('Post liked! ❤️')
        }
      } catch (error) {
        console.error('Error toggling like:', error)
        const errorMessage = error.response?.data?.message || 'Failed to update like'
        
        if (errorMessage.includes('already liked')) {
          await likesAPI.unlikePost(this.post._id)
          this.post.likesCount = Math.max(0, this.post.likesCount - 1)
          this.isLiked = false
          toastService.info('Like removed')
        } else {
          toastService.error(errorMessage)
        }
      } finally {
        this.likeLoading = false
      }
    },
    async addComment(commentData) {
      try {
        const response = await commentsAPI.create(this.post._id, commentData)
        this.comments.unshift(response.data.data)
        this.post.commentsCount++
        toastService.success('Comment added successfully')
      } catch (error) {
        console.error('Error adding comment:', error)
        const errorMessage = error.response?.data?.message || 'Failed to add comment'
        toastService.error(errorMessage)
      }
    },
    async deleteComment(commentId) {
      try {
        await commentsAPI.delete(commentId)
        this.comments = this.comments.filter(comment => comment._id !== commentId)
        this.post.commentsCount = Math.max(0, this.post.commentsCount - 1)
        toastService.success('Comment deleted successfully')
      } catch (error) {
        console.error('Error deleting comment:', error)
        const errorMessage = error.response?.data?.message || 'Failed to delete comment'
        toastService.error(errorMessage)
      }
    },
    async toggleCommentLike(commentId) {
      // سيتم تنفيذها في CommentList
    },
    async deletePost() {
      this.showDeleteConfirm = false
      this.deleting = true
      
      try {
        await postsAPI.delete(this.post._id)
        toastService.success('Post deleted successfully')
        this.$router.push('/')
      } catch (error) {
        console.error('Error deleting post:', error)
        const errorMessage = error.response?.data?.message || 'Failed to delete post'
        toastService.error(errorMessage)
      } finally {
        this.deleting = false
      }
    },
    async sharePost() {
      try {
        if (navigator.share) {
          await navigator.share({
            title: this.post.title,
            text: this.post.content.substring(0, 100),
            url: window.location.href
          })
        } else {
          await navigator.clipboard.writeText(window.location.href)
          toastService.success('Link copied to clipboard! 📋')
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing post:', error)
          try {
            await navigator.clipboard.writeText(window.location.href)
            toastService.success('Link copied to clipboard! 📋')
          } catch (clipboardError) {
            console.error('Error copying to clipboard:', clipboardError)
            toastService.error('Failed to share post. Please copy the URL manually.')
          }
        }
      }
    },
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked
      if (this.isBookmarked) {
        toastService.success('Story bookmarked 🔖')
      } else {
        toastService.info('Story removed from bookmarks')
      }
    }
  }
}
</script>

<style scoped>
/* منع انتشار تأثير hover على العناصر الكبيرة */
.article-container {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* تأكد أن الأزرار مستقلة */
.action-button {
  position: relative;
  z-index: 10;
  isolation: isolate; /* عزل العنصر عن الخلفية */
}

/* إصلاح تأثيرات الـ hover */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

/* منع تأثير الضغط على العناصر الكبيرة عند hover على الأزرار */
.prevent-squish {
  transform: translateZ(0);
  will-change: transform;
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

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
}
</style>