export interface IMessage {
    id: number;
    sender: ISender;
    text: string;
    created: string; // date time iso format
}

interface ISender {
    avatar: string;
    username: string;
    first_name: string;
}
