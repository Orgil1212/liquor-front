import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '@/pages/signin.vue';
import User from '@/pages/user.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,  // Home хуудсыг импортлосон эсэхийг шалгаарай
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
