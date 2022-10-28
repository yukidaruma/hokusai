import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter);
library.add(faYoutube);

createApp(App).component('fa', FontAwesomeIcon).mount('#app');
