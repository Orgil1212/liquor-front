import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '@/pages/signin.vue';
import SignUp from '@/pages/signup.vue'; // Шинээр импортлох
import Home from '@/pages/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  // Бусад маршрутууд...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
