<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'p-4 rounded-lg shadow-lg border transform transition-all duration-300',
          'flex items-start justify-between',
          toast.type === 'success' 
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
            : toast.type === 'error'
            ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            : toast.type === 'warning'
            ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
            : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
        ]"
      >
        <div class="flex items-start space-x-3 flex-1">
          <!-- Icon -->
          <div :class="[
            'flex-shrink-0 w-5 h-5 mt-0.5',
            toast.type === 'success' 
              ? 'text-green-500 dark:text-green-400'
              : toast.type === 'error'
              ? 'text-red-500 dark:text-red-400'
              : toast.type === 'warning'
              ? 'text-yellow-500 dark:text-yellow-400'
              : 'text-blue-500 dark:text-blue-400'
          ]">
            <svg v-if="toast.type === 'success'" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <svg v-else-if="toast.type === 'error'" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <svg v-else-if="toast.type === 'warning'" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <svg v-else fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>

          <!-- Message -->
          <div class="flex-1">
            <p :class="[
              'text-sm font-medium',
              toast.type === 'success' 
                ? 'text-green-800 dark:text-green-300'
                : toast.type === 'error'
                ? 'text-red-800 dark:text-red-300'
                : toast.type === 'warning'
                ? 'text-yellow-800 dark:text-yellow-300'
                : 'text-blue-800 dark:text-blue-300'
            ]">
              {{ toast.message }}
            </p>
          </div>
        </div>

        <!-- Close Button -->
        <button
          @click="hideToast(toast.id)"
          :class="[
            'ml-4 flex-shrink-0 rounded-full p-1 transition-colors',
            toast.type === 'success' 
              ? 'text-green-400 hover:text-green-600'
              : toast.type === 'error'
              ? 'text-red-400 hover:text-red-600'
              : toast.type === 'warning'
              ? 'text-yellow-400 hover:text-yellow-600'
              : 'text-blue-400 hover:text-blue-600'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import ToastService from '@/services/ToastService'

export default {
  name: 'ToastContainer',
  data() {
    return {
      toasts: []
    }
  },
  mounted() {
    // Initialize with current toasts
    this.toasts = ToastService.getToasts()
    
    // Listen for toast updates
    window.addEventListener('toast-update', this.handleToastUpdate)
    
    console.log('ToastContainer mounted, initial toasts:', this.toasts.length)
  },
  beforeUnmount() {
    window.removeEventListener('toast-update', this.handleToastUpdate)
  },
  methods: {
    handleToastUpdate(event) {
      console.log('Toast update event received:', event.detail.toasts)
      this.toasts = [...event.detail.toasts] // استخدام spread operator للتأكد من التفاعلية
    },
    hideToast(id) {
      ToastService.hide(id)
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
}

/* تأكد من أن العناصر تختفي بشكل صحيح */
.toast-move {
  transition: transform 0.3s ease;
}
</style>
