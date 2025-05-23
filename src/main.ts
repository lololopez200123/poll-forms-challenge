import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css';
import App from './App.vue';
import router from './router';

// Comprobar si el modo oscuro debe estar activado
const savedDarkMode = localStorage.getItem('darkMode');
if (
  savedDarkMode === 'true' ||
  (savedDarkMode === null &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
}

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Registrando el plugin
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
