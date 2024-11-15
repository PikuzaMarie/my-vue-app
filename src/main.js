import './styles/base.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(store)

app.mount('#app')
