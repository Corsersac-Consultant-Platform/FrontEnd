<script lang="ts">
import {defineComponent} from 'vue'
import CustomNavbar from "@/components/custom-navbar.component.vue";
import CustomSidebar from "@/components/custom-sidebar.component.vue";
import {useUiStore} from "@/stores/ui.ts";
import CustomButton from "@/components/custom-button.component.vue";
import SearchOption from "@/components/search-option.component.vue";

export default defineComponent({
  name: "the-usage-options-page",
  components: {SearchOption, CustomButton, CustomSidebar, CustomNavbar},
  data(){
    const uiStore = useUiStore();
    return {
      uiStore
    }
  },
  methods: {
    toggleSidebar(){
      this.uiStore.toggleSidebar();
    }
  },
})
</script>

<template>
  <section>
    <nav class="hidden lg:block">
      <CustomNavbar/>
    </nav>
    <section class="sidebar-content bg-white p-2 lg:hidden w-full">
      <CustomSidebar/>
      <img src="../assets/corsersac-logo.webp" alt="Corsersac Logo" class="w-6" />
      <button @click="toggleSidebar" class="w-4rem h-3rem  border-transparent bg-black-alpha-90">
        <i class="pi pi-bars text-lg"></i>
      </button>
    </section>
    <div class="flex flex-column lg:flex-row justify-content-center align-items-center gap-5">
      <SearchOption title="Buscar por fecha" avatar-url="https://icon-library.com/images/date-icon-png/date-icon-png-7.jpg" on-redirect-route="/"/>
      <SearchOption title="Seleccionar rango de fechas" avatar-url="https://static.thenounproject.com/png/204897-200.png" on-redirect-route="/"/>
      <SearchOption title="Buscar por placa" avatar-url="https://cdn-icons-png.flaticon.com/512/290/290081.png" on-redirect-route="/"/>
    </div>
  </section>
</template>

<style scoped>
div{
  margin-top: 150px;
}
button{
  border-radius: 0.5rem;
}
.sidebar-content{
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 990px){
  div{
    margin-top: 20px;
  }
}
</style>