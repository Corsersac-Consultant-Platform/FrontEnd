<script lang="ts">
import {defineComponent} from 'vue'
import CustomSidebar from "@/components/custom-sidebar.component.vue";
import CustomNavbar from "@/components/custom-navbar.component.vue";
import {useUiStore} from "@/stores/ui.ts";
import CustomInputText from "@/components/custom-input-text.component.vue";
import {Column as PvColumn, DataTable as PvDatable, Toast as PvToast} from "primevue";
import CustomButton from "@/components/custom-button.component.vue";
import {UsageService} from "@/helpers/usage.service.ts";
import {Usage} from "@/models/usage.model.ts";

export default defineComponent({
  name: "the-usage-search-date" ,
  components: {PvToast, CustomButton, PvColumn, PvDatable, CustomInputText, CustomNavbar, CustomSidebar},
  data(){
    const uiStore = useUiStore();
    return {
      date: "",
      usages: [] as Usage[],
      usageService: new UsageService(),
      uiStore
    }
  },
  methods: {
    toggleSidebar(){
      this.uiStore.toggleSidebar();
    },
    async getUsages(){
      this.usages = [];
      await this.usageService.getUsageByDate(this.date).then((response) => {
        response.data.map((usageResponse : any) => {
          const {id, date, product,quantity, usageCenter,vehicleIdentifier} = usageResponse;
          const usage = new Usage(id,date, product,quantity, usageCenter,vehicleIdentifier);
          this.usages.push(usage);
        });
      }).catch((_) => {
        this.$toast.add({ severity: 'error', summary: 'No se encontraron consumos', detail: 'No existen consumos disponibles para esta fecha', life: 3000 });
      });
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
        <i class="pi pi-bars text-lg text-white"></i>
      </button>
    </section>
    <div class="flex flex-column lg:flex-row gap-5 align-items-center justify-content-center">
      <input type="date" v-model="date" class="w-10rem h-3rem border-transparent text-white font-bold">
      <CustomButton text="Buscar" @onEvent="getUsages"/>
    </div>

    <div class="table-container">
      <pv-datable class="border-3 border-green-600 bg-black-alpha-80 text-white"  resizable-columns column-resize-mode="expand"  :value="usages" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50re" >
        <pv-column class="bg-black-alpha-80 text-white" field="id" header="ID"></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="date" header="Fecha" ></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="product" header="Producto" ></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="quantity" header="Cantidad" ></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="usageCenter" header="Centro de Consumo" ></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="vehicleIdentifier" header="Placa"></pv-column>
      </pv-datable>
    </div>
    <br>
    <br>
    <pv-toast/>

  </section>
</template>

<style scoped>
div{
  margin-top: 150px;
}
.sidebar-content{
  display: flex;
  justify-content: space-between;
}

.table-container{
  width: 60%;
  margin: 0 auto;
  background-color: #181818;
}
input{
  border-radius: 5px;
  padding: 0.5rem;
  background-color: mediumseagreen;
}
</style>