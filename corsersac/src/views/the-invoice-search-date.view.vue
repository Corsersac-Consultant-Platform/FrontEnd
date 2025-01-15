<script lang="ts">
import {defineComponent} from 'vue'
import CustomSidebar from "@/components/custom-sidebar.component.vue";
import CustomNavbar from "@/components/custom-navbar.component.vue";
import {useUiStore} from "@/stores/ui.ts";
import CustomInputText from "@/components/custom-input-text.component.vue";
import {Column as PvColumn, DataTable as PvDatable, Toast as PvToast} from "primevue";
import {InvoiceService} from "@/helpers/invoice.service.ts";
import {Invoice} from "@/models/invoice.model.ts";
import CustomButton from "@/components/custom-button.component.vue";
import {InvoiceTypes} from "@/enums/invoice-types.ts";
import {UtilManager} from "@/utils/utilManager.ts";

export default defineComponent({
  name: "the-invoice-search-date" ,
  components: {PvToast, CustomButton, PvColumn, PvDatable, CustomInputText, CustomNavbar, CustomSidebar},
  data(){
    const uiStore = useUiStore();
    return {
      date: "",
      statusUpdates: [] ,
      invoices: [] as Invoice[],
      invoiceService: new InvoiceService(),
      utilManager: UtilManager.instance,
      uiStore,
      editMode: false
    }
  },
  methods: {
    toggleSidebar(){
      this.uiStore.toggleSidebar();
    },
    toggleEditMode(value: boolean) {
      this.editMode = value;
    },
    async getInvoices(){
      this.invoices = [];
      await this.invoiceService.getInvoiceByDate(this.date).then((response) => {
        response.data.map((invoiceResponse : any) => {
          const {id, number, amount, serie, register, statusId, emitDate, name} = invoiceResponse;
          const defaultStatus = InvoiceTypes[statusId].toString();
          const invoice = new Invoice(id,emitDate, number, serie,register,name, amount, defaultStatus);
          this.invoices.push(invoice);
        });
      }).catch((_) => {
        this.$toast.add({ severity: 'error', summary: 'No se encontraron facturas', detail: 'No existen facturas disponibles para esta fecha', life: 3000 });
      });
    },
    async updateInvoiceStatus(id: number) {
      try {
        const newStatus = this.statusUpdates[id];
        const statusEntry = Object.entries(InvoiceTypes).find(([key]) => key === newStatus);
        if (!statusEntry) {
          this.$toast.add({
            severity: 'error',
            summary: 'Estado no válido',
            detail: 'El estado de la factura seleccionado no es válido',
            life: 3000,
          });
          return;
        }

        const statusId = statusEntry[1] as number;
        this.invoices = this.invoices.map((invoice) => {
          if (invoice.id === id) {
            invoice.status = newStatus;
          }
          return invoice;
        });
        await this.invoiceService.updateInvoiceStatus(id, statusId);
        this.$toast.add({
          severity: 'success',
          summary: 'Estado actualizado',
          detail: 'El estado de la factura ha sido actualizado correctamente',
          life: 3000,
        });
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error al actualizar',
          detail: 'No se pudo actualizar el estado de la factura',
          life: 3000,
        });
      }
    }

  },

})
</script>

<template>
  <section>
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

    <div class="flex flex-column lg:flex-row gap-5 align-items-center justify-content-center content">
      <input
          type="date"
          v-model="date"
          class="w-10rem h-3rem border-transparent font-bold"
      />
      <button @click="getInvoices" class="w-3 md:w-2 lg:w-1 text-white border-transparent">Buscar</button>
    </div>

    <div class="table-container mt-8">
      <pv-datable
          class="border-3 border-green-600 bg-black-alpha-80 text-white"
          resizable-columns
          column-resize-mode="expand"
          :value="invoices"
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem"
      >
        <template v-if="utilManager.isAdminOrTester()">
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="id"
              header="ID"
              style="width: 5%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="number"
              header="Número"
              style="width: 10%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="emitDate"
              header="Fecha"
              style="width: 10%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="amount"
              header="Monto"
              style="width: 10%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="serie"
              header="Serie"
              style="width: 10%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="register"
              header="Registro"
              style="width: 10%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="name"
              header="Nombre"
              style="width: 10%"
          ></pv-column>
          <pv-column class="bg-black-alpha-80 text-white" header="Estado" style="width: 40%">
            <template #body="slotProps">
              <div v-if="editMode">
                <input
                    type="text"
                    v-model="statusUpdates[slotProps.data.id]"
                    placeholder="Nuevo estado"
                    class="w-20rem bg-black-alpha-90 text-white border border-gray-300 p-2"
                />
                <button
                    class="bg-black-alpha-90 text-white border-transparent ml-4 p-1"
                    @click="updateInvoiceStatus(slotProps.data.id)"
                >
                  Actualizar
                </button>
                <button
                    class="bg-black-alpha-90 text-white border-transparent ml-4 p-1"
                    @click="toggleEditMode(false)"
                >
                  Cancelar
                </button>
              </div>
              <div v-else>
                <span>{{ slotProps.data.status }}</span>
                <button
                    class="bg-black-alpha-90 text-white border-transparent ml-4 p-1"
                    @click="toggleEditMode(true)"
                >
                  Editar
                </button>
              </div>
            </template>
          </pv-column>
        </template>

        <template v-else>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="id"
              header="ID"
              style="width: 10%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="number"
              header="Número"
              style="width: 15%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="emitDate"
              header="Fecha"
              style="width: 15%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="amount"
              header="Monto"
              style="width: 15%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="serie"
              header="Serie"
              style="width: 15%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="register"
              header="Registro"
              style="width: 15%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="name"
              header="Nombre"
              style="width: 15%"
          ></pv-column>
          <pv-column
              class="bg-black-alpha-80 text-white"
              field="status"
              header="Estado"
              style="width: 10%"
          ></pv-column>
        </template>
      </pv-datable>
    </div>

    <br />
    <br />
    <pv-toast />
  </section>

</template>

<style scoped>
.content{
  margin-top: 150px;
}
.sidebar-content{
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 100;
}

button{
  border-radius: 0.5rem;
}


.table-container{
  width: 60%;
  margin: 0 auto;
  background-color: #181818;
}
input{
  border-radius: 5px;
  padding: 0.5rem;
  background-color: white;
}

div button{
  border-radius: 5px;
  padding: 0.5rem;
  border-color: transparent;
  background-color: mediumseagreen;
}
</style>