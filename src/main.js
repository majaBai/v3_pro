import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import api from './api'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$api = api // 全局注入api

const store = createPinia()
store.use(piniaPluginPersistedstate)
app.use(store)

app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus)

app.mount('#app')
