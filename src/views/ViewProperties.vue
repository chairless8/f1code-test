<template>
  <div class="flex flex-col items-center text-white">
    <h1 class="text-4xl font-bold mb-4">View Properties</h1>
    <!-- Contenedor de Filtros -->
    <div class="filters text-black p-4 rounded">
      <div class="flex flex-row justify-between">
        
        <div class="filter-item flex flex-col">
          <label for="name">Nombre:</label>
          <input v-model="filters.name" id="name" type="text" class="p-2 bg-white text-black rounded" />
        </div>

        <div class="filter-item flex flex-col">
          <label for="bedrooms">Número de dormitorios:</label>
          <input v-model="filters.bedrooms" id="bedrooms" type="number" class="p-2 bg-white text-black rounded" />
        </div>

        <div class="filter-item flex flex-col">
          <label for="propertyType">Tipo de propiedad:</label>
          <select v-model="filters.propertyType" id="propertyType" class="p-2 bg-white text-black rounded">
            <option value="">Todos</option>
            <option value="House">Casa</option>
            <option value="Apartment">Apartamento</option>
            <option value="Condominium">Condominio</option>
            <option value="Guesthouse">Casa de invitados</option>
            <option value="Treehouse">Casa del arbol</option>
            <option value="Bed and breakfast">Cama y desayuno</option>
            <option value="Guest suite">Suite de invitados</option>
          </select>
        </div>

        <div class="filter-item flex flex-col">
          <label for="roomType">Tipo de habitación:</label>
          <select v-model="filters.roomType" id="roomType" class="p-2 bg-white text-black rounded">
            <option value="">Todos</option>
            <option value="Entire home/apt">Completo</option>
            <option value="Private room">Cuato privado</option>
          </select>
        </div>
      </div>
      <button @click="applyFilters" class="mt-4 p-2 bg-blue-500 text-white rounded">Aplicar filtros</button>
    </div>
    <div v-if="isLoading" class="text-lg">Cargando...</div>
    <table v-else class="min-w-full bg-white text-black rounded-lg shadow-md">
      <thead class="bg-gray-700 text-white">
        <tr>
          <th class="py-2 px-4 border">Nombre</th>
          <th class="py-2 px-4 border">Tipo de propiedad</th>
          <th class="py-2 px-4 border">Tipo de habitación</th>
          <th class="py-2 px-4 border">Número de cuartos</th>
          <th class="py-2 px-4 border">Listado</th>
          <th class="py-2 px-4 border">Detalle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties" :key="property._id">
          <td class="py-2 px-4 border">{{ property.name }}</td>
          <td class="py-2 px-4 border">{{ property.property_type }}</td>
          <td class="py-2 px-4 border">{{ property.room_type }}</td>
          <td class="py-2 px-4 border">{{ property.bedrooms }}</td>
          <td class="py-2 px-4 border">
            <a :href="property.listing_url" target="_blank" rel="noopener noreferrer">Ver Listado</a>
          </td>
          <td class="py-2 px-4 border">
            <button @click="showDetails(property)">Detalle</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Controles de Paginación -->
    <div v-if="!isLoading" class="pagination p-4">
      <button @click="prevPage" :disabled="currentPage <= 1" class="text-black">Anterior</button>
      <span class="m-4">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages" class="text-black">Siguiente</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { apiURL } from '@/config/apiConfig';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    const isLoading = ref(true);
    const properties = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const filters = ref({
      propertyType: '',
      roomType: '',
      bedrooms: null,
    });

    const fetchProperties = async (page = 1) => {
      try {
        const token = authStore.token;
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            limit: 10,
            ...filters.value,
          },
        };

        const response = await axios.get(`${apiURL}/properties`, config);
        
        properties.value = response.data.properties;
        currentPage.value = response.data.page;
        totalPages.value = response.data.pages;

      } catch (error) {
        console.error("Ocurrió un error al cargar los datos: ", error);
      } finally {
        isLoading.value = false;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        fetchProperties(currentPage.value + 1);
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        fetchProperties(currentPage.value - 1);
      }
    };

    const applyFilters = () => {
      fetchProperties();
    };

    fetchProperties(); // Carga inicial

    return {
      isLoading,
      properties,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      filters,
      applyFilters,
    };
  },
};
</script>

<style scoped>
.filter-item {
  flex: 1;
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 22%;
}

.filters {
  margin-bottom: 2rem;
}
</style>
