<script lang="ts">
import {defineComponent} from 'vue'
import CustomSidebar from "@/components/custom-sidebar.component.vue";
import CustomNavbar from "@/components/custom-navbar.component.vue";
import {useUiStore} from "@/stores/ui.ts";
import CustomInputText from "@/components/custom-input-text.component.vue";
import {Column as PvColumn, DataTable as PvDatable} from "primevue";
import {InvoiceService} from "@/helpers/invoice.service.ts";
import {Invoice} from "@/models/invoice.model.ts";
import CustomButton from "@/components/custom-button.component.vue";
import {AuthService} from "@/helpers/auth.service.ts";

export default defineComponent({
  name: "the-invoice-search-serie" ,
  components: {CustomButton, PvColumn, PvDatable, CustomInputText, CustomNavbar, CustomSidebar},
  data(){
    const uiStore = useUiStore();
    return {
      serie: "",
      invoices: [] as Invoice[],
      invoiceService: new InvoiceService(),
      uiStore
    }
  },
  methods: {
    toggleSidebar(){
      this.uiStore.toggleSidebar();
    },
    async getInvoices(){
      this.invoices = [];
      await this.invoiceService.getInvoiceBySerie(this.serie).then((response) => {
        response.data.map((invoiceResponse : any) => {
          const {id, number, amount, serie, register, statusId, emitDate, name} = invoiceResponse;
          const invoice = new Invoice(id,emitDate, number, serie,register,name, amount, statusId);
          this.invoices.push(invoice);
        });
      }).catch((_) => {
        alert("No se encontraron facturas");
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
      <button @click="toggleSidebar" class="w-4rem h-3rem  border-transparent">
        <i class="pi pi-bars text-lg"></i>
      </button>
    </section>
    <div class="flex flex-column lg:flex-row gap-5 align-items-center justify-content-center">
       <input type="text" v-model="serie" placeholder="Número de serie" class="w-4/5"/>
      <CustomButton text="Buscar" @onEvent="getInvoices"/>
    </div>

    <div class="table-container">
      <pv-datable class="border-3 border-green-600 bg-black-alpha-80 text-white"  resizable-columns column-resize-mode="expand"  :value="invoices" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50re" >
        <pv-column class="bg-black-alpha-80 text-white" field="id" header="ID" style="width: 10%"></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="number" header="Número" style="width: 15%"></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="emitDate" header="Fecha" style="width: 15%"></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="amount" header="Monto" style="width: 15%"></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="serie" header="Serie" style="width: 15%"></pv-column>
        <pv-column class="bg-black-alpha-80 text-white" field="register" header="Registro" style="width: 15%"></pv-column>
        <pv-column  class="bg-black-alpha-80 text-white" field="statusId" header="Estado" style="width: 10%"></pv-column>
      </pv-datable>
    </div>

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
  border-color: transparent;
}
</style>