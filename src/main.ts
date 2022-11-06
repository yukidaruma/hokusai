import { ViteSSG } from 'vite-ssg';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faSearch,
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import './style.scss';
import routerOptions from './router';
import App from './App.vue';

library.add(faSort);
library.add(faSortDown);
library.add(faSortUp);
library.add(faSearch);
library.add(faTwitch);
library.add(faTwitter);
library.add(faYoutube);

export const createApp = ViteSSG(
  App,
  routerOptions,
  ({ app, router, routes, isClient, initialState }) => {
    app.use(router);
    app.component('fa', FontAwesomeIcon);

    // Expose router for onclick callback
    if (!import.meta.env.SSR) {
      (window as any).router = router;
    }
    const linkify = (html: string) => {
      // Note: this is not XSS-safe
      return html.replaceAll(/<@(\w{1,15}):(.*?)>/g, (_, player, label) => {
        return `<a href="/${player}" onclick="router.push('/${player}'); event.preventDefault()">${label}</a>`;
      });
    };
    app.directive('linkify', {
      beforeMount: (el: HTMLElement, binding) => {
        el.innerHTML = linkify(binding.value);
      },
      updated: (el: HTMLElement, binding, vNode) => {
        el.innerHTML = linkify(binding.value);
      },
    });
  }
);
