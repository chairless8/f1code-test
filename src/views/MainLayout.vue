<template>
  <div class="flex flex-col min-h-screen">
    <NavbarComponent v-if="$route.path !== '/welcome'" />
    <main class="flex-grow custom-height mx-12 my-12">
      <div class="p-8 bg-white bg-opacity-20 rounded-lg shadow-lg h-full  pt-12">
        <router-view></router-view>
      </div>
    </main>
    <footer v-if="$route.path !== '/welcome'" class="bg-quaternary text-white text-center p-4 backdrop-blur-md">
      Footer
    </footer>
  </div>
</template>

<script>
import NavbarComponent from '../components/Navbar.vue';

export default {
  components: {
    NavbarComponent,
  },
};
</script>

<style scoped>
.custom-height {
  min-height: calc(100vh - 280px);
}
</style>
