import { reactive, computed } from "vue"

const state = reactive({
    accessToken: null,
    user: null
})

export const loggedIn = computed(() => !!state.accessToken)
export const setToken = (token: any) => state.accessToken = token
export const setUser = (user: any) => state.user = user