import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from './router'

const app = createApp(App)
import PrimeVue from 'primevue/config'
import {Column, DataTable} from "primevue";
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

app.mount('#app')
