import { createApp } from 'vue'
import App from './App.vue'
import icons from './components/icons/all'
import Toast from "@/components/toast/Toast.vue"

const app = createApp(App)

for (const [key, value] of Object.entries(icons)) {
    app.component(key, value);
}

app.component("app-toast", Toast)

app.mount('#app')
