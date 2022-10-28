import { createApp } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import './style.scss';
import router from './router';
import App from './App.vue';

library.add(faTwitter);
library.add(faYoutube);

createApp(App).use(router).component('fa', FontAwesomeIcon).mount('#app');
