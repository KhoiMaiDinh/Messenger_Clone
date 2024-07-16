import axios from "axios";

const api = axios.create({
    baseURL: "https://api.chatengine.io",
    headers: {
        "Content-Type": "application/json",
        // "private-key": import.meta.env.VITE_CHAT_ENGINE_PRIVATE_KEY,
    },
});

export default api;
