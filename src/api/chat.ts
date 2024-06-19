import api from "@/api/apiInstance";

export const fetchChats = async (
    prj_id: string,
    usr_name: string,
    usr_secret: string
) => {
    return await api.get("/chats/", {
        headers: {
            "project-id": prj_id,
            "user-name": usr_name,
            "user-secret": usr_secret,
        },
    });
};

export const createChat = async (
    prj_id: string,
    usr_name: string,
    usr_secret: string,
    opponent_name: string
) => {
    return await api.put(
        "/chats/",
        {
            usernames: [opponent_name],
            title: "direct_chat",
            is_direct_chat: true,
        },
        {
            headers: {
                "project-id": prj_id,
                "user-name": usr_name,
                "user-secret": usr_secret,
            },
        }
    );
};
