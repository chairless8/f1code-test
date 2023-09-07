import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routes';  // Asegúrate de importar tu configuración de router
import './style.css';
import App from './App.vue';

// Inicializar Pinia
const pinia = createPinia();

// Crear la aplicación Vue
const app = createApp(App);

// Usar Pinia y Vue Router
app.use(pinia);
app.use(router);

// Montar la aplicación
app.mount('#app');
