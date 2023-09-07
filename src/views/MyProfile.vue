<!-- MyProfile.vue -->
<template>
  <div class="profile-container p-8">
    <h1 class="text-3xl font-semibold mb-4">Mi Perfil</h1>
    <div v-if="user" class="space-y-4">
      <div>
        <p><span class="font-medium">Nombre completo:</span> {{ user.fullName }}</p>
        <p><span class="font-medium">Fecha de Nacimiento:</span> {{ user.birthDate }}</p>
        <p><span class="font-medium">Email:</span> {{ user.email }}</p>
        <p><span class="font-medium">Rol:</span> {{ user.role }}</p>
        <p><span class="font-medium">Estado de cuenta:</span> {{ user.isActive ? 'Activa' : 'Inactiva' }}</p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold">Mis Direcciones</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="address in addresses" :key="address._id" class="border rounded p-4">
            <p class="font-medium">{{ address.country }}, {{ address.state }}, {{ address.city }}</p>
            <p>{{ address.street }}</p>
            <p>Código Postal: {{ address.postalCode }}</p>
            <button @click="loadAddressToEdit(address._id)" class="mt-2 px-4 py-2 border rounded hover:bg-gray-200 text-black">
              Editar
            </button>
          </div>
        </div>
        <button @click="newAddressModal" class="mt-4 px-4 py-2 border rounded hover:bg-gray-200 text-black">
          Agregar dirección
        </button>
      </div>
    </div>

    <div v-else>
      <p>Cargando información del usuario...</p>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-700 opacity-50"></div>

    <!-- Modal -->
    <div class="bg-white p-12 rounded-lg shadow-lg w-1/2 text-black z-10">
      <h2 class="text-2xl mb-6">Agregar Nueva Dirección</h2>
      <form @submit.prevent="addAddress">
        <div class="mb-4">
          <label for="country" class="block text-sm font-medium">País</label>
          <input id="country" v-model="newAddress.country" type="text" class="p-2 w-full border rounded bg-white" required />
        </div>
        <div class="mb-4">
          <label for="state" class="block text-sm font-medium">Estado</label>
          <input id="state" v-model="newAddress.state" type="text" class="p-2 w-full border rounded bg-white" required />
        </div>
        <div class="mb-4">
          <label for="city" class="block text-sm font-medium">Ciudad</label>
          <input id="city" v-model="newAddress.city" type="text" class="p-2 w-full border rounded bg-white" required />
        </div>
        <div class="mb-4">
          <label for="street" class="block text-sm font-medium">Calle</label>
          <input id="street" v-model="newAddress.street" type="text" class="p-2 w-full border rounded bg-white" required />
        </div>
        <div class="mb-4">
          <label for="postalCode" class="block text-sm font-medium">Código Postal</label>
          <input id="postalCode" v-model="newAddress.postalCode" type="text" class="p-2 w-full border rounded bg-white" required />
        </div>
        <div class="flex justify-between mt-6">
          <button type="submit" class="px-6 py-2 border rounded hover:bg-gray-200">Guardar</button>
          <button @click="showModal = false" class="px-6 py-2 border rounded hover:bg-gray-200">Cancelar</button>
        </div>
      </form>
    </div>
  </div>


</template>


<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { apiURL } from "@/config/apiConfig";

export default {
  setup() {
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);  // Propiedad computada para el usuario
    const editingAddressId = ref(null);
    const addresses = ref([]); // Direcciones del usuario
    const showModal = ref(false); // Estado del modal
    const newAddress = ref({  // Datos del nuevo registro de dirección
      country: '',
      state: '',
      city: '',
      street: '',
      postalCode: ''
    });

    const loadAddressToEdit = (id) => {
      const address = addresses.value.find(addr => addr._id === id);
      if (address) {
        editingAddressId.value = id;
        newAddress.value = { ...address };
        showModal.value = true;
      }
    };


    const saveAddress = async () => {
      if (editingAddressId.value) {
        await axios.put(`${apiURL}/address/${editingAddressId.value}`, newAddress.value, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
      } else {
        await axios.post(`${apiURL}/address`, newAddress.value, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
      }

      fetchAddresses();
      showModal.value = false;
      editingAddressId.value = null; // Reset ID después de guardar
    };


    // Obtener direcciones
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(`${apiURL}/address`, {
          headers: { Authorization: `Bearer ${authStore.token}` }
        });
        addresses.value = data;
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    const newAddressModal = () => {
      console.log("mm")
      newAddress.value = {
        country: '',
        state: '',
        city: '',
        street: '',
        postalCode: ''
      };
      editingAddressId.value = null;
      showModal.value = true;
    };


    // Llamada a la API cuando el componente se monta
    onMounted(fetchAddresses);

    return {
      user,
      addresses,
      showModal,
      newAddress,
      addAddress: saveAddress,
      fetchAddresses,
      loadAddressToEdit,
      newAddressModal
    };
  }
};
</script>



<style scoped>
/* Tus estilos aquí */
.profile-container {
  padding: 20px;
}
</style>
