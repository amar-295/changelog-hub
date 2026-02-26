import axios from "axios"

const API_URL = "/api/v1/users/"

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const authService = {
    register: async (userData) => {
        try {
            const response = await apiClient.post("/register", userData);
            return response.data
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong"
            throw new Error(message)
        }
    },

    login: async (userData) => {
        try {
            const response = await apiClient.post("/login", userData);
            return response.data
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong"
            throw new Error(message)
        }
    }
}
