import api from "@/api/apiInstance";

const createMessage = async (
    prj_id: string,
    usr_name: string,
    usr_secret: string,
    chat_id: string,
    text: string
) => {
    return await api.post(
        `/chats/${chat_id}/messages/`,
        {
            text: text,
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

const getLatestChats = async (
    prj_id: string,
    usr_name: string,
    usr_secret: string,
    chat_id: string,
    chat_count: number
) => {
    return await api.get(`/chats/${chat_id}/messages/latest/${chat_count}/`, {
        headers: {
            "project-id": prj_id,
            "user-name": usr_name,
            "user-secret": usr_secret,
        },
    });
};

const readMessage = async (
    prj_id: string,
    usr_name: string,
    usr_secret: string,
    chat_id: string,
    last_read: number
) => {
    return await api.patch(
        `/chats/${chat_id}/people/`,
        {
            last_read,
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

export { createMessage, getLatestChats, readMessage };
