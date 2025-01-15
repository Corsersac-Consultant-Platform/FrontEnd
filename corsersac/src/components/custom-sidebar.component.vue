<script lang="ts">
import { useUiStore } from '@/stores/ui';
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "custom-sidebar",
  data(){
    const uiStore = useUiStore();
    return {
     uiStore
    }
  },
})
</script>

<template>
  <nav
      :class="[
        'bg-white h-screen p-4 shadow-lg fixed transition-all duration-300 w-30rem left-0 z-99',
        uiStore.sidebarOpen ? 'block' : 'hidden'
      ]">
    <div class="flex flex-column items-center">
      <img src="../assets/corsersac-logo.webp" alt="Corsersac Logo" class="w-16 lg:w-20 mb-6" />
      <ul class="flex flex-column gap-4 w-full">
        <li>
          <a class="text-black-alpha-90 text-lg flex items-center gap-3 hover:text-blue-500" href="/">
            <i class="pi pi-file"></i> Visualización de facturas
          </a>
        </li>
        <li>
          <a class="text-black-alpha-90 text-lg flex items-center gap-3 hover:text-blue-500" href="/usage-options">
            <i class="pi pi-chart-bar"></i> Detalles de consumo
          </a>
        </li>
        <button
            @click="uiStore.toggleSidebar()" class="w-2 p-2 border-transparent">
          <i class="pi pi-times"></i>
        </button>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
button {
  background-color: mediumseagreen;
  color: white;
  border-radius: 0.5rem;
}
</style>