import { createApp } from 'vue';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css'; // Import Tailwind CSS

import router from './router';

createApp(App).use(router).mount('#app');