import {createApp, nextTick} from 'vue'
import App from './App.vue'
import icons from './components/icons/all'
import Toast from "@/components/toast/Toast.vue"
import Modal from "@/components/Modal.vue"
import router from "@/router"

const app = createApp(App)

app.use(router)

for (const [key, value] of Object.entries(icons)) {
    app.component(key, value);
}

app.component("app-toast", Toast)
app.component("app-modal", Modal)
app.directive("focus", {
    mounted(el) {
        el.focus()
    }
})
app.directive("highlight", {
    mounted: async (el: any) => {
        await nextTick(() => {
            let selectionEnd = el.value.length

            if (el.value.includes(".")) {
                selectionEnd = el.value.split(".").slice(0, -1).join(".").length
            }

            el.setSelectionRange(0, selectionEnd)
            el.focus()
        })
    }
})


app.mount('#app')
