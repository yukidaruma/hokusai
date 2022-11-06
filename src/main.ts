import { createApp } from 'vue';

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
import router from './router';
import App from './App.vue';

library.add(faSort);
library.add(faSortDown);
library.add(faSortUp);
library.add(faSearch);
library.add(faTwitch);
library.add(faTwitter);
library.add(faYoutube);

(async () => {
  const app = createApp(App);
  app.use(router);
  app.component('fa', FontAwesomeIcon);

  // Expose router for onclick callback
  (window as any).router = router;
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

  // Register components globally
  const components = import.meta.glob('./components/*.vue');
  for (const [filename, loadComponent] of Object.entries(components)) {
    const componentName = filename
      .replace('./components/', '')
      .replace('.vue', '');
    const component = (await loadComponent()) as any;
    app.component(componentName, component.default);
  }

  app.mount('#app');
})();
