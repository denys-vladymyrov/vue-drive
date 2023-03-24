import axios from "axios"
import {accessToken, setToken, setUser} from "@/store"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const http = axios.create({
    baseURL: BASE_URL
})

http.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${accessToken()}`
    return config
}, (error) => {

    return Promise.reject(error)
  })

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        setUser(null)
        setToken(null)
        location.reload()
    }
    else {
        return Promise.reject(error)
    }
})

export default http

