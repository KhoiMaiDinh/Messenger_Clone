export interface IChat {
    id: number;
    is_direct_chat: boolean;
    last_message: ILastMessage;
    title: string;
    people: { person: IPerson }[];
}

interface ILastMessage {
    sender_username: string;
    text: string;
}

interface IPerson {
    username: string;
    first_name: string;
    avatar: string;
    is_online: boolean;
}
