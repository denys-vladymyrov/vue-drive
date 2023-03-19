import http from "@/api/http"

export const register = (data: any) => http.post("/register", data)
export const login = (data: any) => http.post("/login", data)