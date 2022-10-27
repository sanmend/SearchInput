import axios from "axios";
export const request = axios.create({
    timeout: 6000,
    baseURL: '/api'
})