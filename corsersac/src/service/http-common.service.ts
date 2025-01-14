import axios from "axios";

export const http = axios.create({
    baseURL: 'http://localhost:5209',
    headers: {
        'Content-type': 'application/json',
    },
});