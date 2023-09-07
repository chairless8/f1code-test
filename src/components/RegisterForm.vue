<template>
  <form @submit.prevent="submitForm" class="text-white">
    <div class="mb-4 text-lg">
      <label for="fullName" class="text-gray-300">Nombre completo</label>
      <input id="fullName" v-model="credentials.fullName" type="text" class="rounded-3xl border-none bg-accent bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-secondary shadow-lg outline-none backdrop-blur-md w-full mt-2" placeholder="John Doe4">
    </div>
    <div class="mb-4 text-lg">
      <label for="birthDate" class="text-gray-300">Fecha de nacimiento</label>
      <input id="birthDate" v-model="credentials.birthDate" type="date" class="rounded-3xl border-none bg-accent bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-secondary shadow-lg outline-none backdrop-blur-md w-full mt-2">
    </div>
    <div class="mb-4 text-lg">
      <label for="email" class="text-gray-300">Email</label>
      <input id="email" v-model="credentials.email" type="email" class="rounded-3xl border-none bg-accent bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-secondary shadow-lg outline-none backdrop-blur-md w-full mt-2" placeholder="john.doe4@example.com">
    </div>
    <div class="mb-4 text-lg">
      <label for="password" class="text-gray-300">Contraseña</label>
      <input id="password" v-model="credentials.password" type="password" class="rounded-3xl border-none bg-accent bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-secondary shadow-lg outline-none backdrop-blur-md w-full mt-2" placeholder="Tu contraseña">
    </div>
    <div class="mt-8 flex justify-center text-lg">
      <button type="submit" class="rounded-3xl bg-accent bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-secondary">Registrarse</button>
    </div>
    <div v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</div>
  </form>
</template>


<script>
export default {
  data() {
    return {
      credentials: {
        fullName: '',
        birthDate: '',
        email: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    validateFields() {
      if (!this.credentials.fullName) {
        return 'El nombre completo es obligatorio.';
      }
      if (!this.credentials.birthDate) {
        return 'La fecha de nacimiento es obligatoria.';
      }
      if (!this.credentials.email) {
        return 'El email es obligatorio.';
      }
      if (!this.credentials.password) {
        return 'La contraseña es obligatoria.';
      }
      // Agrega más validaciones aquí según lo necesites.
      return '';
    },
    submitForm() {
      const error = this.validateFields();
      if (error) {
        this.errorMessage = error;
        return;
      }
      this.$emit('submitCustom', this.credentials);
      this.errorMessage = '';
    }
  }
};
</script>
  
  <style scoped>
  .form-input {
    /* Puedes añadir más estilos aquí si lo necesitas */
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
  </style>
  