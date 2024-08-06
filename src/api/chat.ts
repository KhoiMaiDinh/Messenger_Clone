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
    const JsonTheme = {
        theme: "DEFAULT_THEME",
    };
    return await api.put(
        "/chats/",
        {
            usernames: [opponent_name],
            title: "direct_chat",
            is_direct_chat: true,
            custom_json: JSON.stringify(JsonTheme),
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

export const updateChat = async (
    prj_id: string,
    usr_name: string,
    usr_secret: string,
    chat_id: string,
    body: { [key: string]: any }
) => {
    return await api.patch(`chats/${chat_id}/`, body, {
        headers: {
            "project-id": prj_id,
            "user-name": usr_name,
            "user-secret": usr_secret,
        },
    });
};
