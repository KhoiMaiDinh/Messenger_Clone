export interface IUser {
    id: number;
    avatar: string;
    email: string;
    is_online: boolean;
    last_message: ILastMessage;
    username: string;
}

interface ILastMessage {
    text: string;
    created: string;
}
