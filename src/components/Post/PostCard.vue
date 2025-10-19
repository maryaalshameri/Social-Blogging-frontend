<template>
  <article :class="[
    'rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md',
    darkMode 
      ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900' 
      : 'bg-white border-gray-200'
  ]">
    <!-- Post Header -->
    <div :class="[
      'p-6 border-b',
      darkMode ? 'border-gray-700' : 'border-gray-100'
    ]">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <router-link :to="`/users/${post.author._id}`" class="flex items-center space-x-3">
            <img 
              v-if="post.author.avatar"
              :src="`http://localhost:5000${post.author.avatar}`"  
              class="w-10 h-10 rounded-full object-cover"
            />
            <div :class="[
              'w-10 h-10 rounded-full flex items-center justify-center',
              darkMode ? 'bg-gray-700' : 'bg-gray-300'
            ]">
              <span :class="[
                'text-sm font-medium',
                darkMode ? 'text-gray-300' : 'text-gray-600'
              ]">
                {{ post.author.username?.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <h3 :class="[
                'font-semibold',
                darkMode ? 'text-white' : 'text-gray-900'
              ]">{{ post.author.username }}</h3>
              <p :class="[
                'text-sm',
                darkMode ? 'text-gray-400' : 'text-gray-500'
              ]">{{ formatDate(post.createdAt) }}</p>
            </div>
          </router-link>
        </div>
        
        <div v-if="isAuthor" class="flex items-center space-x-2">
          <button 
            @click="$emit('edit', post)"
            :class="[
              'transition-colors',
              darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'
            ]"
          >
            <!-- Edit Icon -->
          </button>
          <button 
            @click="$emit('delete', post)"
            :class="[
              'transition-colors',
              darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
            ]"
          >
            <!-- Delete Icon -->
          </button>
        </div>
      </div>

      <router-link :to="`/posts/${post._id}`">
        <h2 :class="[
          'text-xl font-bold mb-3 transition-colors',
          darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
        ]">
          {{ post.title }}
        </h2>
      </router-link>

      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in post.tags" 
          :key="tag"
          :class="[
            'px-2 py-1 text-xs rounded-full',
            darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
          ]"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Post Content Preview -->
    <div class="p-6">
      <p :class="[
        'line-clamp-3 mb-4',
        darkMode ? 'text-gray-300' : 'text-gray-700'
      ]">
        {{ post.content }}
      </p>
      
      <div v-if="post.image" class="mb-4">
        <img 
          :src="`http://localhost:5000${post.image}`" 
          :alt="post.title"
          class="w-full h-48 object-cover rounded-lg"
        />
      </div>
    </div>

    <!-- Post Actions -->
    <div :class="[
      'px-6 py-4 border-t',
      darkMode ? 'border-gray-700' : 'border-gray-100'
    ]">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <!-- Like Button -->
          <button 
            @click="toggleLike"
            :class="[
              'flex items-center space-x-2 transition-colors',
              isLiked 
                ? 'text-red-600' 
                : darkMode 
                  ? 'text-gray-400 hover:text-red-400' 
                  : 'text-gray-500 hover:text-red-600'
            ]"
          >
            <!-- Like Icon -->
            <span class="text-sm font-medium">{{ post.likesCount }}</span>
          </button>

          <!-- Comment Button -->
          <router-link 
            :to="`/posts/${post._id}`"
            :class="[
              'flex items-center space-x-2 transition-colors',
              darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
            ]"
          >
            <!-- Comment Icon -->
            <span class="text-sm font-medium">{{ post.commentsCount }}</span>
          </router-link>

          <!-- Views -->
          <div :class="[
            'flex items-center space-x-2',
            darkMode ? 'text-gray-400' : 'text-gray-500'
          ]">
            <!-- Views Icon -->
            <span class="text-sm font-medium">{{ post.views }}</span>
          </div>
        </div>

        <router-link 
          :to="`/posts/${post._id}`"
          :class="[
            'text-sm font-medium transition-colors',
            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          ]"
        >
          Read more →
        </router-link>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user', 'darkMode']),
    isAuthor() {
      return this.user && this.user._id === this.post.author._id
    },
    isLiked() {
      return false
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    async toggleLike() {
      // Implement like/unlike functionality
    }
  }
}
</script>