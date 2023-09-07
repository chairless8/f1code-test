<template>
  <div class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat transition-opacity duration-300" style="background-image:url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')">
    <div class="rounded-xl bg-primary bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md transition-shadow duration-300 max-sm:px-8">
      <div class="text-white">
        <div class="mb-8 flex flex-col items-center">
          <h1 class="mb-2 text-2xl">Registrarse</h1>
          <span class="text-gray-300">Introduce los detalles para registrarte</span>
        </div>
        <RegisterForm @submitCustom="handleRegister" />
        <div class="mt-4 flex justify-between">
          <router-link to="/welcome" class="text-sm text-gray-300 hover:text-white">Volver a la Bienvenida</router-link>
          <router-link to="/login" class="text-sm text-gray-300 hover:text-white">¿Ya tienes una cuenta? Iniciar Sesión</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RegisterForm from '../components/RegisterForm.vue'; // Asumiendo que tienes un componente similar al LoginForm para el registro
const apiURL = import.meta.env.VITE_API_URL;

export default {
  components: {
    RegisterForm
  },
  methods: {
    async handleRegister(credentials) {
      try {
        const response = await fetch(apiURL + '/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Registration successful', data);
          this.$router.push('/dashboard');
        } else {
          console.log('Registration failed', data);
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
