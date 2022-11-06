import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/HomePage/HomePage.vue';
import PlayerPage from '@/pages/PlayerPage/PlayerPage.vue';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, _savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/:player',
      name: 'player.details',
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
