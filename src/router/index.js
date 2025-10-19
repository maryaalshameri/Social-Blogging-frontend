import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import AdminUsers from '../views/admin/AdminUsers.vue'
import AdminPosts from '../views/admin/AdminPosts.vue'
import AdminComments from '../views/admin/AdminComments.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
 {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('../views/author/Dashboard.vue'),
  meta: { requiresAuth: true },
  beforeEnter: (to, from, next) => {
    const user = store.state.user
    if (user?.role === 'admin') {
      next('/admin')
    } else if (user?.role === 'reader') {
      next('/reader-dashboard')
    } else {
      next()
    }
  }
},
{
  path: '/reader-dashboard',
  name: 'ReaderDashboard',
  component: () => import('../views/reader/ReaderDashboard.vue'),
  meta: { requiresAuth: true, requiresReader: true }
},

{
  path: '/my-likes',
  name: 'MyLikes',
  component: () => import('../views/reader/MyLikes.vue'),
  meta: { requiresAuth: true, requiresReader: true }
},
{
  path: '/my-comments',
  name: 'MyComments',
  component: () => import('../views/reader/MyComments.vue'),
  meta: { requiresAuth: true, requiresReader: true }
},
{
  path: '/admin',
  name: 'AdminDashboard',
  component: () => import('../views/admin/AdminDashboard.vue'),
  meta: { requiresAuth: true, requiresAdmin: true }
},

     { path: '/admin/users', name: 'AdminUsers', component: AdminUsers },
      { path: '/admin/posts', name: 'AdminPosts', component: AdminPosts },
      { path: '/admin/comments', name: 'AdminComments', component: AdminComments },

  {
    path: '/posts/create',
    name: 'CreatePost',
    component: () => import('@/views/author/CreatePost.vue'),
    meta: { requiresAuth: true, requiresAuthor: true }
  },
  {
  path: '/posts/:id/edit',
  name: 'EditPost',
  component: () => import('../views/author/EditPost.vue'),
  meta: { requiresAuth: true }
},
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue')
  },
  // {
  //   path: '/posts/:id/edit',
  //   name: 'EditPost',
  //   component: () => import('../views/CreatePost.vue'),
  //   meta: { requiresAuth: true, requiresAuthor: true }
  // },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue')
  },
  {
  path: '/forgot-password',
  name: 'ForgotPassword',
  component: () => import('../views/ForgotPassword.vue'),
  meta: { public: true }
},
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated
  const user = store.state.user

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.guestOnly && isAuthenticated) {
    next('/dashboard')
  } else if (to.meta.requiresAuthor && user?.role === 'reader') {
    next('/')
  } else if (to.meta.requiresAdmin && user?.role !== 'admin') {
    next('/dashboard')
  } else {
    next()
  }
})
 



router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')
  
  if (requiresAuth && token && !store.state.user) {
    try {
      // تحميل بيانات المستخدم إذا كانت مفقودة
      const response = await store.$http.get('/auth/me')
      if (response.data.success) {
        store.commit('SET_USER', response.data.data)
        next()
      } else {
        next('/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      next('/login')
    }
  } else {
    next()
  }
})


export default router


