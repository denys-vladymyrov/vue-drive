import {createRouter, createWebHistory} from "vue-router"
import routes from "@/router/routes"
import {loggedIn} from "@/store"

const router = createRouter({
  routes,
  history: createWebHistory(),
  linkActiveClass: 'active'
})


router.beforeEach((to) => {
    if (to.meta.requiresAuth && !loggedIn.value) {
        return {
            name: "login",
            query: {
                redirect: to.fullPath
            }
        }
    }
})

export default router

