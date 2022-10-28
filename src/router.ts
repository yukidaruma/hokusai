import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/HomePage/HomePage.vue';
import PlayerPage from '@/pages/PlayerPage/PlayerPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/players/:player',
      component: PlayerPage,
    },
    // Fallback
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
