import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Lightning from '../views/Lightning.vue';
import Trending from '../views/Trending.vue';
import Profile from '../views/Profile.vue';

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/search', component: Search, name: 'Search' },
    { path: '/lightning', component: Lightning, name: 'Lightning' },
    { path: '/trending', component: Trending, name: 'Trending' },
    { path: '/profile', component: Profile, name: 'Profile' },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
