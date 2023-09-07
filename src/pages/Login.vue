<template>
  <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style="background-image:url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')">
    <div class="rounded-xl bg-primary bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
      <div class="text-white">
        <div class="mb-8 flex flex-col items-center">
          <h1 class="mb-2 text-2xl">Iniciar sesión</h1>
          <span class="text-gray-300">Introduce los detalles de inicio de sesión</span>
        </div>
        <LoginForm @submitCustom="handleLogin" />
        <div class="mt-4 flex justify-between">
          <router-link to="/welcome" class="text-sm text-gray-300 hover:text-white">Volver a la Bienvenida</router-link>
          <p class="text-sm text-gray-300">¿No tienes una cuenta? <router-link to="/register" class="text-sm text-gray-300 hover:text-white">Regístrate</router-link> </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import LoginForm from '../components/LoginForm.vue';
import { useAuthStore } from '@/stores/auth';
import { apiURL } from "@/config/apiConfig";

export default {
  components: {
    LoginForm
  },
  methods: {
    async handleLogin(credentials) {
      console.log("iniciando log" + credentials)
      console.log(credentials)
      try {
        const response = await fetch( apiURL + '/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          const authStore = useAuthStore();
          authStore.setToken(data.token);
          console.log('Login successful', data);
          this.$router.push('/profile');
        } else {
          console.log('Login failed', data);
        }
        
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>
