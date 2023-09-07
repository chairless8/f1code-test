<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary backdrop-blur-md">
    <div class="text-center py-16 px-10 rounded-lg bg-primary bg-opacity-50 backdrop-blur-md">
      <h1 class="text-4xl font-bold text-white mb-2">
        ¡Bienvenido al Code Challenge!
      </h1>
      <h2 class="text-2xl text-gray-300 mb-8">
        El lugar donde los desarrolladores se convierten en maestros
      </h2>
      <div class="flex space-x-4">
        <button @click="login" class="px-6 py-2 text-white bg-accent rounded transition-colors duration-300 hover:bg-accent-hover">
          Iniciar Sesión
        </button>
        <button @click="register" class="px-6 py-2 text-white bg-secondary rounded transition-colors duration-300 hover:bg-secondary-hover">
          Registrarse
        </button>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const login = () => {
    console.log('Iniciar sesión');
    router.push('/login');
  };
  
  const register = () => {
    console.log('Registrarse');
    router.push('/register');
  };
  </script>
  
  