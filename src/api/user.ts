import api from "@/api/apiInstance";

export const fetchUsers = async () => {
    return await api.get("/users/");
};
