import App from './App.vue'
import Particles from '@tsparticles/vue3'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import { createRouter } from 'vue-router'
import { routerConfig } from './router'
import { loadFull as init } from 'tsparticles'

const app = createApp(App)

app.use(createRouter(routerConfig))
app.use(createPinia())
app.use(autoAnimatePlugin)
app.use(Particles, { init })

app.mount('#root')
