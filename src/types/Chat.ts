export interface IChat {
    id: number;
    is_direct_chat: boolean;
    last_message: ILastMessage;
    title: string;
    people: { person: IPerson; last_read: number }[];
    custom_json: string;
}

export interface ILastMessage {
    id: number;
    sender_username: string;
    text: string;
    created: string; // ISO String
}

interface IPerson {
    username: string;
    first_name: string;
    avatar: string;
    is_online: boolean;
}
