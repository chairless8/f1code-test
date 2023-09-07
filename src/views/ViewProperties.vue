<template>
  <div class="flex flex-col items-center h-screen text-white">
    <h1 class="text-4xl font-bold mb-4">View Properties</h1>
    <div v-if="isLoading" class="text-lg">Cargando...</div>
    <table v-else class="min-w-full bg-white text-black rounded-lg shadow-md">
      <thead class="bg-gray-700 text-white">
        <tr>
          <th class="py-2 px-4 border">ID</th>
          <th class="py-2 px-4 border">Name</th>
          <th class="py-2 px-4 border">Property Type</th>
          <th class="py-2 px-4 border">Room Type</th>
          <th class="py-2 px-4 border">Bedrooms</th>
          <!-- Agregar más columnas según los datos recibidos -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties" :key="property._id">
          <td class="py-2 px-4 border">{{ property._id }}</td>
          <td class="py-2 px-4 border">{{ property.name }}</td>
          <td class="py-2 px-4 border">{{ property.property_type }}</td>
          <td class="py-2 px-4 border">{{ property.room_type }}</td>
          <td class="py-2 px-4 border">{{ property.bedrooms }}</td>
          <!-- Agregar más celdas según los datos recibidos -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { apiURL } from "@/config/apiConfig";

export default {
  data() {
    return {
      isLoading: true,
      properties: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(apiURL + "/properties?page=3&limit=10");
      this.properties = response.data.properties;
    } catch (error) {
      console.error("Ocurrió un error al cargar los datos: ", error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
/* Aquí puedes añadir estilos adicionales */
</style>
