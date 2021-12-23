import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../views/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import('@/views/teacher/index.vue')
      },
      {
        path: '/student',
        name: 'student',
        component: () => import('@/views/student/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/role/index.vue')
      }
    ],
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/account/login.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.length) {
    const token: string | null = localStorage.getItem('EASYSHOW_TOKEN');
    if (to.matched[0]?.meta?.auth && !token) {
      next(`/login?from=${to.path}`);
    } else {
      next();
    }
  } else {
    next("/dashboard");
  }
});

export default router
