<template>
  <form @submit.prevent="handleSubmit" class="text-white flex flex-col items-center justify-center">
    <div class="mb-4 text-lg w-full flex justify-center">
      <input class="rounded-3xl border-none bg-accent bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-secondary shadow-lg outline-none backdrop-blur-md" type="email" v-model="email" placeholder="id@email.com" />
    </div>
    <div class="mb-4 text-lg w-full flex justify-center">
      <input class="rounded-3xl border-none bg-accent bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-secondary shadow-lg outline-none backdrop-blur-md" type="password" v-model="password" placeholder="*********" />
    </div>
    <div class="mt-8 flex justify-center text-lg">
      <button type="submit" class="rounded-3xl bg-accent bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-secondary">Login</button>
    </div>
  </form>
</template>



<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleSubmit() {
      console.log("mandando...")
      this.$emit('submitCustom', { email: this.email, password: this.password });
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales si los necesitas */
</style>
