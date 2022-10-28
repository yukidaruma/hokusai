import { createApp } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import './style.scss';
import router from './router';
import App from './App.vue';

library.add(faSearch);
library.add(faTwitter);
library.add(faYoutube);

(async () => {
  const app = createApp(App);
  app.use(router);
  app.component('fa', FontAwesomeIcon);

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
