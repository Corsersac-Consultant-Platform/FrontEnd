<script lang="ts">
import {defineComponent} from 'vue'
import {UsageService} from "@/helpers/usage.service.ts";
import CustomNavbar from "@/components/custom-navbar.component.vue";
import CustomSidebar from "@/components/custom-sidebar.component.vue";
import {useUiStore} from "@/stores/ui.ts";

export default defineComponent({
  name: "the-usage-viewchart",
  components: {CustomSidebar, CustomNavbar},
  data(){
    const uiStore = useUiStore();
    return {
      usageService: new UsageService(),
      year: 0,
      chartData: {},
      chartOptions: {},
      uiStore
    }
  },
  methods: {
    toggleSidebar(){
      this.uiStore.toggleSidebar();
    },
    async getUsage(){
      await this.usageService.countUsageByYearPerCenter(this.year).then(response => {
        const responseData = response.data;
        const labels = Object.keys(responseData);
        const data = Object.values(responseData);

        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Total de consumos',
              data: data,
              backgroundColor: '#3CB371FF',
            }
          ]
        };
      });
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              display: false,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    }
  },
  mounted() {
    this.chartOptions = this.setChartOptions();
  }
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
    <div class="flex flex-column gap-5 mt-8">
      <div class="flex flex-column lg:flex-row gap-5 justify-content-center align-items-center">
        <input v-model="year" placeholder="Ingrese la fecha" class="w-4/5">
        <button @click="getUsage" class="w-3 md:w-2 lg:w-1 text-white border-transparent">Buscar</button>
      </div>
      <pv-chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem] bg-white"  />
    </div>
    <br>
    <br>
  </section>
</template>

<style scoped>

.sidebar-content{
  display: flex;
  justify-content: space-between;
}
input{
  border-radius: 5px;
  padding: 0.5rem;
  border-color: transparent;
}
div button{
  border-radius: 5px;
  padding: 0.5rem;
  border-color: transparent;
  background-color: mediumseagreen;
}


</style>