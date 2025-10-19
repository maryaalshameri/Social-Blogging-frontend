<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 :class="[
        'text-3xl font-bold mb-2',
        darkMode ? 'text-white' : 'text-gray-900'
      ]">
        Create New Post
      </h1>
      <p :class="[
        'text-lg',
        darkMode ? 'text-gray-300' : 'text-gray-600'
      ]">
        Share your thoughts and ideas with the community
      </p>
    </div>

    <!-- Create Post Form -->
    <div :class="[
      'rounded-xl p-6 mb-8',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <form @submit.prevent="createPost" class="space-y-6">
        <!-- Title -->
        <div>
          <label for="title" :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Post Title
          </label>
          <input
            id="title"
            v-model="postForm.title"
            type="text"
            required
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg font-medium',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            ]"
            placeholder="Enter a compelling title..."
            maxlength="200"
          >
          <p :class="[
            'mt-1 text-xs text-right',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          ]">
            {{ postForm.title.length }}/200
          </p>
        </div>

        <!-- Content -->
        <div>
          <label for="content" :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Content
          </label>
          <textarea
            id="content"
            v-model="postForm.content"
            rows="12"
            required
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            ]"
            placeholder="Write your post content here..."
          ></textarea>
        </div>

        <!-- Featured Image -->
        <div>
          <label :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Featured Image
          </label>
          <div class="flex items-center space-x-6">
            <div class="flex-shrink-0">
              <div v-if="previewImage" class="w-32 h-32 rounded-lg overflow-hidden">
                <img :src="previewImage" class="w-full h-full object-cover" />
              </div>
              <div v-else :class="[
                'w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center',
                darkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-400'
              ]">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <input
                type="file"
                ref="imageInput"
                accept="image/*"
                @change="handleImageUpload"
                class="hidden"
              >
              <button
                type="button"
                @click="$refs.imageInput.click()"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                Choose Image
              </button>
              <button
                v-if="previewImage"
                type="button"
                @click="removeImage"
                :class="[
                  'ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  darkMode 
                    ? 'bg-red-700 hover:bg-red-600 text-white' 
                    : 'bg-red-100 hover:bg-red-200 text-red-700'
                ]"
              >
                Remove
              </button>
              <p :class="[
                'mt-1 text-xs',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                JPG, PNG or GIF. Max 5MB. Recommended: 1200x630px
              </p>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Tags
          </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="(tag, index) in postForm.tags"
              :key="index"
              :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm',
                darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
              ]"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-1 hover:opacity-70"
              >
                ×
              </button>
            </span>
          </div>
          <div class="flex space-x-2">
            <input
              id="tags"
              v-model="tagInput"
              type="text"
              :class="[
                'flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              ]"
              placeholder="Add a tag..."
              @keydown.enter.prevent="addTag"
            >
            <button
              type="button"
              @click="addTag"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              Add
            </button>
          </div>
          <p :class="[
            'mt-1 text-xs',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          ]">
            Press Enter or click Add to include tags. Maximum 10 tags.
          </p>
        </div>

        <!-- Status -->
        <div>
          <label for="status" :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Status
          </label>
          <select
            id="status"
            v-model="postForm.status"
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            ]"
          >
            <option value="published">Publish Now</option>
            <option value="draft">Save as Draft</option>
          </select>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800">
          <p class="text-sm text-red-600 dark:text-red-400">
            {{ error }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t" :class="darkMode ? 'border-gray-700' : 'border-gray-200'">
          <router-link
            to="/"
            :class="[
              'px-6 py-2 rounded-lg font-medium transition-colors',
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="loading"
            :class="[
              'px-6 py-2 rounded-lg font-medium text-white transition-colors',
              loading
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            <span v-if="loading">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Publishing...
            </span>
            <span v-else>
              {{ postForm.status === 'draft' ? 'Save Draft' : 'Publish Post' }}
            </span>
          </button>
        </div>
      </form>
    </div>

    <!-- Preview (Optional) -->
    <div v-if="postForm.title || postForm.content" :class="[
      'rounded-xl p-6',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <h3 class="text-xl font-semibold mb-4">Preview</h3>
      <div class="prose max-w-none" :class="darkMode ? 'prose-invert' : ''">
        <h2>{{ postForm.title || 'Untitled' }}</h2>
        <p class="whitespace-pre-wrap">{{ postForm.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postsAPI } from '@/services/api'
import socketService from '@/services/socket'
export default {
  name: 'CreatePost',
  data() {
    return {
      postForm: {
        title: '',
        content: '',
        tags: [],
        status: 'published',
        image: null
      },
      tagInput: '',
      previewImage: null,
      loading: false,
      error: ''
    }
  },
  computed: {
    ...mapState(['user', 'darkMode'])
  },
  methods: {
    addTag() {
      const tag = this.tagInput.trim()
      if (tag && this.postForm.tags.length < 10 && !this.postForm.tags.includes(tag)) {
        this.postForm.tags.push(tag)
        this.tagInput = ''
      }
    },
    removeTag(index) {
      this.postForm.tags.splice(index, 1)
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          this.error = 'File size must be less than 5MB'
          return
        }
        
        this.postForm.image = file
        this.previewImage = URL.createObjectURL(file)
        this.error = ''
      }
    },
    removeImage() {
      this.postForm.image = null
      this.previewImage = null
      this.$refs.imageInput.value = ''
    },
    async createPost() {
      this.loading = true
      this.error = ''

      try {
        const formData = new FormData()
        formData.append('title', this.postForm.title)
        formData.append('content', this.postForm.content)
        formData.append('status', this.postForm.status)
        this.postForm.tags.forEach(tag => formData.append('tags[]', tag))
        if (this.postForm.image) {
          formData.append('image', this.postForm.image)
        }

        const response = await postsAPI.create(formData)
        
        if (response.data.success) {
           if (socketService.getConnectionStatus()) {
        socketService.emitGlobalEvent('socket-newPost', response.data.data)
      }

          this.$router.push(`/posts/${response.data.data._id}`)
          ToastService.success('Post created successfully!')
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create post'
         ToastService.error(this.error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>