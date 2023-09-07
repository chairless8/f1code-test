import { defineStore } from 'pinia';
import axios from 'axios';
import { apiURL } from "@/config/apiConfig";

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      this.fetchUser();
    },
    clearToken() {
      this.token = null;
      this.user = null;
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const { data } = await axios.get( apiURL + '/user/me', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = data;
      } catch (error) {
        console.error('Error fetching user:', error);
        this.clearToken(); // Limpiar token si hay un error
      }
    },
  },
});
