// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'
import Aura from '@primeuix/themes/aura';
import InputText from 'primevue/inputtext';
import './assets/main.css';

const app = createApp(App)

// Register PrimeVue plugin and components globally
app.use(createPinia())
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// Register components globally
app.component('PrimeButton', Button)
app.component('InputText', InputText)

app.mount('#app')
