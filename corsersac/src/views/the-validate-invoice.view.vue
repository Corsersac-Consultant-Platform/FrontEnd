<script lang="ts">
import { defineComponent } from 'vue';
import { InvoiceService } from "@/helpers/invoice.service.ts";
import CustomNavbar from "@/components/custom-navbar.component.vue";
import CustomSidebar from "@/components/custom-sidebar.component.vue";
import { useUiStore } from "@/stores/ui.ts";
import { UtilManager } from "@/utils/utilManager.ts";
import {Button as PvButton, Dialog as PvDialog} from "primevue";
import {Invoice} from "@/models/invoice.model.ts";

export default defineComponent({
  name: "the-validate-invoice",
  computed: {
    UtilManager() {
      return UtilManager;
    }
  },
  components: {PvButton, PvDialog, CustomSidebar, CustomNavbar },
  data() {
    const uiStore = useUiStore();
    return {
      serie: "",
      number: "",
      invoiceService: new InvoiceService(),
      invoiceExists: false,
      invoiceData: new Invoice(0,"",0,"","","", 0, ""),
      uiStore,
      visible: false
    };
  },
  methods: {
    toggleSidebar() {
      this.uiStore.toggleSidebar();
    },
    async existInvoice() {
      const response = await this.invoiceService.invoiceExists(this.serie, this.number);
      if(response.data){
        this.invoiceExists = response.data;
        const invoices = await this.invoiceService.getInvoiceBySerie(this.serie);
        this.invoiceData = invoices.data.filter((invoice: Invoice) => invoice.number === this.number)[0];
      }
      else{
        this.$toast.add({ severity: 'error', summary: 'La factura no existe en el sistema', detail: 'Por favor, revise sus datos y vuelva a intentar', life: 3000 })
      }
    },
    async updateInvoiceStatus(id: number, status: number){
      await this.invoiceService.updateInvoiceStatus(id, status);
      this.visible = false;
      this.$toast.add({ severity: 'success', summary: 'Estado de la factura actualizado', detail: 'El estado de la factura ha sido actualizado correctamente', life: 3000 })
    }
  },
  watch:{
    invoiceExists(){
      this.visible = true;
    }
  }
});
</script>

<template>
  <section class="page-size">
    <nav class="hidden lg:block">
      <CustomNavbar />
    </nav>
    <section class="sidebar-content bg-white p-2 lg:hidden w-full">
      <CustomSidebar />
      <img src="../assets/corsersac-logo.webp" alt="Corsersac Logo" class="w-6" />
      <button @click="toggleSidebar" class="w-4rem h-3rem border-transparent bg-black-alpha-90 sm:mt-3 md:mt-5">
        <i class="pi pi-bars text-lg text-white"></i>
      </button>
    </section>
    <div class="flex flex-column gap-5 mt-8">
      <div class="flex flex-column lg:flex-row gap-5 justify-content-center align-items-center ">
        <input v-model="serie" placeholder="Ingrese la serie" class="w-4/5">
        <input v-model="number" placeholder="Ingrese el número" class="w-4/5">
        <button @click="existInvoice" class="w-3 md:w-2 lg:w-1 text-white border-transparent">Validar</button>
      </div>
      <div v-if="invoiceExists" class="flex flex-column gap-5">
        <iframe
            :src="UtilManager.instance.getPdfFromFileName(serie, number)"
            class="invoice-iframe">
        </iframe>
        <div v-if="UtilManager.instance.isAdminOrTester()">
          <pv-dialog  v-model:visible="visible" modal header="Ingrese el estado de la factura" :style="{ width: '25rem' }">
            <div class="card flex justify-end gap-2">
              <pv-button label="Pagado" severity="success" @click="updateInvoiceStatus(invoiceData.id,1)" raised/>
              <pv-button label="Vencido"  severity="danger" @click="updateInvoiceStatus(invoiceData.id,2)" raised/>
              <pv-button label="Por vencer"  severity="warn" @click="updateInvoiceStatus(invoiceData.id,3)" raised/>
            </div>
          </pv-dialog>
        </div>
        <div v-else>

        </div>
      </div>
      <div v-else>
      </div>
      <pv-toast/>
    </div>
    <br>
    <br>
  </section>
</template>

<style scoped>
.sidebar-content {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 100;
}
input {
  border-radius: 5px;
  padding: 0.5rem;
  border-color: transparent;
}
div button {
  border-radius: 5px;
  padding: 0.5rem;
  border-color: transparent;
  background-color: mediumseagreen;
}
.invoice-iframe {
  width: 50%;
  margin: 0 auto;
  height: calc(100vh - 150px);
  border: none;
}

@media (max-width: 768px) {
  .invoice-iframe {
    width: 100%;
  }
}

</style>
