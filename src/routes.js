import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from './views/MainLayout.vue';  // Importar MainLayout
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import ManageAddresses from './views/ManageAddresses.vue';
import ViewProperties from './views/ViewProperties.vue';
import Dashboard from './views/Dashboard.vue';
import Welcome from './pages/Welcome.vue';

import { useAuthStore } from '@/stores/auth';

const routes = [
  { 
    path: '/', 
    component: MainLayout, 
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'addresses', component: ManageAddresses },
      { path: 'properties', component: ViewProperties }
      // Agrega aquí más rutas protegidas
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/welcome', component: Welcome },
  { path: '/:catchAll(.*)', redirect: '/welcome' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/welcome');
  } else {
    next();
  }
});

export default router;
