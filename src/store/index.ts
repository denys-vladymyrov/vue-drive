import { reactive, computed, watch } from "vue"

const defaultState = reactive({
    accessToken: null,
    user: null
})

const initState = () => JSON.parse(localStorage.getItem("authState")!) || defaultState
const state = reactive(initState())

watch(state, (newState) => {
    localStorage.setItem("authState", JSON.stringify(newState))
})

export const accessToken = () => state.accessToken

export const loggedIn = computed(() => !!state.accessToken)
export const setToken = (token: any) => state.accessToken = token
export const setUser = (user: any) => state.user = user