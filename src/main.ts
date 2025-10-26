import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import './assets/style.css'
import App from './App.vue'
import router from './routes'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'

const app = createApp(App)
app.use(ToastService)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue',
            },
            darkModeSelector: '.my-app-dark',
        },
    },
})
app.use(router)
app.mount('#app')
