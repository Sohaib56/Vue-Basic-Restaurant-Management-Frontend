import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; // Import your router configuration
import store from './components/store/store';

const app = createApp(App);
app.use(router); // Use Vue Router as a plugin
app.use(store);
app.mount('#app');
