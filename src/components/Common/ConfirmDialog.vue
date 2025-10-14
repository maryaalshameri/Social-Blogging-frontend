<template>
  <div v-if="visible" class="fixed inset-0 z-[100] overflow-y-auto">
    <!-- Backdrop with blur effect -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" @click="cancel"></div>

    <!-- Main Modal -->
    <div class="flex items-center justify-center min-h-screen px-4 py-6">
      <div class="relative w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
        <!-- Animated background effects -->
        <div class="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
          
          <!-- Header with gradient border -->
          <div class="border-b border-gray-200/30 dark:border-gray-700/30">
            <!-- Animated icon container -->
            <div class="relative p-6">
              <!-- Floating background effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Main icon with animation -->
              <div class="relative flex justify-center">
                <div :class="[
                  'relative w-20 h-20 rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12',
                  type === 'danger' 
                    ? 'bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 shadow-lg shadow-red-500/20' 
                    : type === 'warning'
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 shadow-lg shadow-yellow-500/20'
                    : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/20'
                ]">
                  <!-- Animated icon -->
                  <svg :class="[
                    'w-10 h-10 transform transition-all duration-500 group-hover:scale-110',
                    type === 'danger' 
                      ? 'text-red-500 group-hover:text-red-600' 
                      : type === 'warning'
                      ? 'text-yellow-500 group-hover:text-yellow-600'
                      : 'text-blue-500 group-hover:text-blue-600'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="type === 'danger'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    <path v-else-if="type === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  
                  <!-- Pulsing ring effect -->
                  <div :class="[
                    'absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 animate-ping',
                    type === 'danger' 
                      ? 'border-red-400' 
                      : type === 'warning'
                      ? 'border-yellow-400'
                      : 'border-blue-400'
                  ]"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="px-8 py-6">
            <div class="text-center space-y-4">
              <!-- Title -->
              <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {{ title }}
              </h3>
              
              <!-- Message -->
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {{ message }}
              </p>
            </div>
          </div>

          <!-- Actions Section -->
          <div class="px-8 pb-8">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- Cancel Button -->
              <button
                type="button"
                @click="cancel"
                class="group flex-1 px-6 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg"
              >
                <span class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Cancel
                </span>
              </button>

              <!-- Confirm Button -->
              <button
                type="button"
                @click="confirm"
                :class="[
                  'group flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden',
                  type === 'danger' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg shadow-red-500/25' 
                    : type === 'warning'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg shadow-yellow-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25'
                ]"
              >
                <!-- Shine effect -->
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span class="relative flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ confirmText }}
                </span>
              </button>
            </div>
          </div>

          <!-- Decorative elements -->
          <div class="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-300/50 to-transparent dark:via-gray-600/50"></div>
          <div class="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-300/50 to-transparent dark:via-gray-600/50"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirm Action'
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    type: {
      type: String,
      default: 'danger',
      validator: (value) => ['danger', 'warning', 'info'].includes(value)
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Smooth transitions for modal */
.scale-95 {
  transform: scale(0.95);
}

.scale-100 {
  transform: scale(1);
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
  }
  
  .backdrop-blur-xl {
    backdrop-filter: blur(20px);
  }
}
</style>