<script lang="ts">
import {defineComponent} from 'vue'
import CustomNavbar from "@/components/custom-navbar.component.vue";
import CustomSidebar from "@/components/custom-sidebar.component.vue";
import {useUiStore} from "@/stores/ui.ts";
import CustomButton from "@/components/custom-button.component.vue";
import SearchOption from "@/components/search-option.component.vue";
import {UtilManager} from "@/utils/utilManager.ts";

export default defineComponent({
  name: "the-usage-options-page",
  computed: {
    UtilManager() {
      return UtilManager
    }
  },
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
      <button @click="toggleSidebar" class="w-4rem h-3rem  border-transparent bg-black-alpha-90 sm:mt-3 md:mt-5">
        <i class="pi pi-bars text-lg text-white"></i>
      </button>
    </section>
      <div v-if="UtilManager.instance.isAdminOrTester()" class="flex flex-column lg:flex-row flex-wrap justify-content-center align-items-center gap-5 content" >
        <SearchOption title="Buscar por fecha" avatar-url="https://icon-library.com/images/date-icon-png/date-icon-png-7.jpg" on-redirect-route="/usage-search-date"/>
        <SearchOption title="Seleccionar rango de fechas" avatar-url="https://static.thenounproject.com/png/204897-200.png" on-redirect-route="/usage-range-date"/>
        <SearchOption title="Buscar por placa" avatar-url="https://cdn-icons-png.flaticon.com/512/290/290081.png" on-redirect-route="/usage-vehicleIdentifier"/>
        <SearchOption title="Visualizar gráfico" avatar-url="https://static.vecteezy.com/system/resources/previews/004/999/434/original/graph-chart-icon-symbol-of-business-free-vector.jpg" on-redirect-route="/usage-viewchart"/>
      </div>
      <div v-else class="flex flex-column lg:flex-row flex-wrap justify-content-center align-items-center gap-5 content">
        <SearchOption title="Buscar por fecha" avatar-url="https://icon-library.com/images/date-icon-png/date-icon-png-7.jpg" on-redirect-route="/usage-search-date"/>
        <SearchOption title="Seleccionar rango de fechas" avatar-url="https://static.thenounproject.com/png/204897-200.png" on-redirect-route="/usage-range-date"/>
        <SearchOption title="Buscar por placa" avatar-url="https://cdn-icons-png.flaticon.com/512/290/290081.png" on-redirect-route="/usage-vehicleIdentifier"/>
      </div>
    <br>
    <br>
  </section>
</template>

<style scoped>
.content{
  margin-top: 150px;
}
button{
  border-radius: 0.5rem;
}
.sidebar-content{
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 100;
}

@media screen and (max-width: 990px){
  div{
    margin-top: 20px;
  }
}
</style>