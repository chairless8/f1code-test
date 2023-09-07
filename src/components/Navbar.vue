<template>
    <header class="py-4 px-2 bg-primary backdrop-blur-md text-white">
      <nav class="flex items-center justify-between flex-wrap">
        <div class="block lg:hidden">
          <button @click="toggleMenu" class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
            <!-- SVG for hamburger menu -->
          </button>
        </div>
        <div :class="{'hidden': !menuVisible, 'w-full flex-grow lg:flex lg:items-center lg:w-auto': true}" id="main-nav">
          <div class="text-sm lg:flex-grow mt-2 xl:mx-8 flex justify-between">
            <!-- Direcciones a la izquierda -->
            <div>
              <router-link to="/profile" class="mx-2 p-1 text-white hover:bg-opacity-50 rounded-lg">
                Mi perfil
              </router-link>
              <router-link to="/properties" class="mx-2 p-1 text-white hover:bg-opacity-50 rounded-lg">
                Ver Propiedades
              </router-link>
            </div>
  
            <!-- Sesión a la derecha -->
            <div class="flex items-center"> <!-- Añadir flex para alinear horizontalmente -->
                <div class="mx-2 p-1 text-white">
                Usuario: JohnDoe
                </div>
                <button @click="logout" class="mx-2 p-1 hover:bg-opacity-50 rounded-lg text-black">
                    Cerrar sesión
                </button>
                </div>
            </div>
        </div>
      </nav>
    </header>
  </template>
  
  <script>
import { useAuthStore } from "@/stores/auth";

  export default {
    data() {
      return {
        menuVisible: false,
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      logout() {
        const auth = useAuthStore();
        auth.clearToken();
        this.$router.push('/login'); // Redirige al usuario a la página de inicio de sesión
      },
    },
  };
  </script>
  
  <style scoped>
  /* No hay sombras de texto según tu preferencia */
  </style>
  