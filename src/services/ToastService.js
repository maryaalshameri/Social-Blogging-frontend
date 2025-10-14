
class ToastService {
  constructor() {
    this.toasts = []
    this.nextId = 1
    // Initialize event listener for storage changes (for cross-tab communication)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange.bind(this))
    }
  }

  show(message, type = 'info', duration = 5000) {
    const id = this.nextId++
    const toast = {
      id,
      message,
      type,
      duration,
      visible: true,
      timestamp: Date.now()
    }

    this.toasts.push(toast)
    console.log('Toast shown:', toast) // Debug log

    // Auto remove after duration
    setTimeout(() => {
      this.hide(id)
    }, duration)

    // Dispatch event for UI update
    this.dispatchEvent()

    // Also store in localStorage for persistence across components
    this.saveToStorage()

    return id
  }

  success(message, duration = 5000) {
    return this.show(message, 'success', duration)
  }

  error(message, duration = 5000) {
    return this.show(message, 'error', duration)
  }

  warning(message, duration = 5000) {
    return this.show(message, 'warning', duration)
  }

  info(message, duration = 5000) {
    return this.show(message, 'info', duration)
  }

  hide(id) {
    const index = this.toasts.findIndex(toast => toast.id === id)
    if (index !== -1) {
      this.toasts.splice(index, 1)
      this.dispatchEvent()
      this.saveToStorage()
    }
  }

  clear() {
    this.toasts = []
    this.dispatchEvent()
    this.saveToStorage()
  }

  dispatchEvent() {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('toast-update', {
        detail: { toasts: this.toasts }
      })
      window.dispatchEvent(event)
    }
  }

  saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('toasts', JSON.stringify(this.toasts))
    }
  }

  loadFromStorage() {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('toasts')
        if (stored) {
          this.toasts = JSON.parse(stored)
          this.dispatchEvent()
        }
      } catch (error) {
        console.error('Error loading toasts from storage:', error)
      }
    }
  }

  handleStorageChange(event) {
    if (event.key === 'toasts') {
      this.loadFromStorage()
    }
  }

  getToasts() {
    return [...this.toasts]
  }
}

// Create singleton instance
const toastService = new ToastService()

// Load any stored toasts on initialization
if (typeof window !== 'undefined') {
  toastService.loadFromStorage()
}

export default toastService
