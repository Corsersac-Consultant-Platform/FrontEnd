import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from './router'

const app = createApp(App)
import PrimeVue from 'primevue/config'
import {Button, Column, DataTable, Dialog, Toast} from "primevue";
import Chart from "primevue/chart";
app.use(PrimeVue,{
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})
app.use(createPinia())
app.use(router)
app.component('pv-datable', DataTable)
app.component('pv-column', Column)
app.component('pv-chart', Chart)
app.component('pv-dialog', Dialog)
app.use(ToastService);
app.component('pv-toast', Toast)
app.component('pv-button', Button)
app.mount('#app')
