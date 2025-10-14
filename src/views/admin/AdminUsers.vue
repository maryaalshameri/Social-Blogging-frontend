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
            User Management
          </h1>
          <p :class="[
            'text-lg',
            darkMode ? 'text-gray-300' : 'text-gray-600'
          ]">
            Manage all platform users
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="exportUsers"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            ]"
          >
            Export CSV
          </button>
        </div>
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
            placeholder="Search users..."
          >
        </div>
        <div>
          <label :class="[
            'block text-sm font-medium mb-2',
            darkMode ? 'text-gray-300' : 'text-gray-700'
          ]">
            Role
          </label>
          <select
            v-model="filters.role"
            :class="[
              'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            ]"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="author">Author</option>
            <option value="reader">Reader</option>
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
            <option value="createdAt">Registration Date</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
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
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div :class="[
      'rounded-xl overflow-hidden',
      darkMode ? 'bg-gray-800' : 'bg-white shadow border border-gray-200'
    ]">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead :class="darkMode ? 'bg-gray-700' : 'bg-gray-50'">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                User
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                Role
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                Joined
              </th>
              <th class="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                Status
              </th>
              <th class="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider" :class="darkMode ? 'text-gray-300' : 'text-gray-500'">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y" :class="darkMode ? 'divide-gray-700' : 'divide-gray-200'">
            <tr 
              v-for="user in users" 
              :key="user._id"
              :class="darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img 
                      v-if="user.avatar" 
                      :src="`http://localhost:5000${user.avatar}`" 
                      class="h-10 w-10 rounded-full object-cover"
                    />
                    <div v-else :class="[
                      'h-10 w-10 rounded-full flex items-center justify-center',
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    ]">
                      <span :class="[
                        'text-sm font-medium',
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      ]">
                        {{ user.username?.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div :class="[
                      'text-sm font-medium',
                      darkMode ? 'text-white' : 'text-gray-900'
                    ]">
                      {{ user.username }}
                    </div>
                    <div :class="[
                      'text-sm',
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    ]">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full',
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    : user.role === 'author'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                ]">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm" :class="darkMode ? 'text-gray-400' : 'text-gray-500'">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'px-2 py-1 text-xs rounded-full',
                  user.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                ]">
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="editUser(user)"
                    :class="[
                      'px-3 py-1 rounded text-xs transition-colors',
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                    ]"
                  >
                    Edit
                  </button>
                  <button
                    v-if="user._id !== currentUser._id"
                    @click="toggleUserStatus(user)"
                    :class="[
                      'px-3 py-1 rounded text-xs transition-colors',
                      user.isActive
                        ? darkMode 
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                          : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                        : darkMode 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-green-100 hover:bg-green-200 text-green-700'
                    ]"
                  >
                    {{ user.isActive ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button
                    v-if="user._id !== currentUser._id"
                    @click="showDeleteDialog(user)"
                    :class="[
                      'px-3 py-1 rounded text-xs transition-colors',
                      darkMode 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                    ]"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p :class="['mt-4', darkMode ? 'text-gray-400' : 'text-gray-500']">Loading users...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="users.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
        </svg>
        <h3 :class="['mt-2 text-sm font-medium', darkMode ? 'text-gray-300' : 'text-gray-900']">
          No users found
        </h3>
        <p :class="['mt-1 text-sm', darkMode ? 'text-gray-400' : 'text-gray-500']">
          Try adjusting your search or filter
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="users.length > 0" :class="[
        'px-6 py-4 border-t',
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
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

    <!-- Edit User Modal -->
    <div v-if="editingUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div :class="[
        'rounded-xl p-6 w-full max-w-md',
        darkMode ? 'bg-gray-800' : 'bg-white'
      ]">
        <h3 :class="[
          'text-lg font-semibold mb-4',
          darkMode ? 'text-white' : 'text-gray-900'
        ]">
          Edit User
        </h3>
        
        <div class="space-y-4">
          <div>
            <label :class="[
              'block text-sm font-medium mb-2',
              darkMode ? 'text-gray-300' : 'text-gray-700'
            ]">
              Username
            </label>
            <input
              v-model="editingUser.username"
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
              Email
            </label>
            <input
              v-model="editingUser.email"
              type="email"
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
              Role
            </label>
            <select
              v-model="editingUser.role"
              :class="[
                'w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              ]"
            >
              <option value="reader">Reader</option>
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="editingUser = null"
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
            @click="saveUser"
            :class="[
              'px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors'
            ]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :visible="showDeleteConfirm"
      title="Delete User"
      :message="`Are you sure you want to delete user '${userToDelete?.username}'? This action cannot be undone.`"
      confirmText="Delete"
      type="danger"
      @confirm="deleteUser"
      @cancel="hideDeleteDialog"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { usersAPI } from '@/services/api'
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue'
import ToastService from '@/services/ToastService'

export default {
  name: 'AdminUsers',
  components: {
    ConfirmDialog
  },
  data() {
    return {
      users: [],
      loading: false,
      editingUser: null,
      userToDelete: null,
      showDeleteConfirm: false,
      filters: {
        search: '',
        role: '',
        sortBy: 'createdAt',
        order: 'desc'
      },
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      }
    }
  },
  computed: {
    ...mapState(['darkMode', 'user']),
    currentUser() {
      return this.user || {}
    }
  },
  watch: {
    filters: {
      handler() {
        this.pagination.page = 1
        this.loadUsers()
      },
      deep: true
    },
    'pagination.page'() {
      this.loadUsers()
    }
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      this.loading = true
      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...this.filters
        }

        const response = await usersAPI.getAll(params)
        if (response.data.success) {
          this.users = response.data.data
          // إصلاح مشكلة NaN - التأكد من أن البيانات تأتي بشكل صحيح
          this.pagination.total = response.data.pagination?.total || response.data.total || this.users.length
        }
      } catch (error) {
        console.error('Error loading users:', error)
        ToastService.error('Failed to load users')
      } finally {
        this.loading = false
      }
    },

    editUser(user) {
      this.editingUser = { ...user }
    },

    async saveUser() {
      try {
        const response = await usersAPI.update(this.editingUser._id, {
          username: this.editingUser.username,
          email: this.editingUser.email,
          role: this.editingUser.role
        })

        if (response.data.success) {
          // Update local user data
          const index = this.users.findIndex(u => u._id === this.editingUser._id)
          if (index !== -1) {
            this.users[index] = { ...this.users[index], ...response.data.data }
          }
          this.editingUser = null
          ToastService.success('User updated successfully!')
        }
      } catch (error) {
        console.error('Error updating user:', error)
        ToastService.error('Failed to update user')
      }
    },

    async toggleUserStatus(user) {
      try {
        const response = await usersAPI.update(user._id, {
          isActive: !user.isActive
        })

        if (response.data.success) {
          // Update local user data
          const index = this.users.findIndex(u => u._id === user._id)
          if (index !== -1) {
            this.users[index].isActive = !user.isActive
          }
          const action = user.isActive ? 'deactivated' : 'activated'
          ToastService.success(`User ${action} successfully!`)
        }
      } catch (error) {
        console.error('Error toggling user status:', error)
        ToastService.error('Failed to update user status')
      }
    },

    showDeleteDialog(user) {
      this.userToDelete = user
      this.showDeleteConfirm = true
    },

    hideDeleteDialog() {
      this.userToDelete = null
      this.showDeleteConfirm = false
    },

 async deleteUser() {
      if (!this.userToDelete) return

      try {
        console.log('Deleting user:', this.userToDelete._id)
        const response = await usersAPI.delete(this.userToDelete._id)

        if (response.data.success) {
          this.users = this.users.filter(u => u._id !== this.userToDelete._id)
          ToastService.success('User deleted successfully!')
          
          this.pagination.total = Math.max(0, this.pagination.total - 1)
          
          if (this.users.length === 0 && this.pagination.page > 1) {
            this.pagination.page--
            this.loadUsers()
          }
        } else {
          ToastService.error('Failed to delete user: ' + (response.data.message || 'Unknown error'))
        }
      } catch (error) {
        console.error('Error deleting user:', error)
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error'
        ToastService.error('Failed to delete user: ' + errorMessage)
      } finally {
        this.hideDeleteDialog()
      }
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

    exportUsers() {
      try {
        const headers = ['Username', 'Email', 'Role', 'Status', 'Joined Date']
        const data = this.users.map(user => [
          user.username,
          user.email,
          user.role,
          user.isActive ? 'Active' : 'Inactive',
          new Date(user.createdAt).toLocaleDateString()
        ])

        const csvContent = [headers, ...data]
          .map(row => row.map(field => `"${field}"`).join(','))
          .join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'users.csv'
        link.click()
        window.URL.revokeObjectURL(url)
        
        ToastService.success('Users exported successfully!')
      } catch (error) {
        console.error('Error exporting users:', error)
        ToastService.error('Failed to export users')
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>
