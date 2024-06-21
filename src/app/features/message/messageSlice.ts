import { IChat } from "@/types/Chat";
import { IMessage } from "@/types/Message";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MessagesState {
    chatId: string;
    messages: IMessage[];
}

const initialState: MessagesState[] = [];
// oldest --> latest
export const messagesSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        fetchMessages: (
            state,
            action: PayloadAction<{ chatId: string; messages: any[] }>
        ) => {
            const chatExisted = state.findIndex(
                (chat) => chat.chatId == action.payload.chatId
            );
            if (chatExisted == -1) state.push(action.payload);
            else
                state[chatExisted].messages = [
                    ...action.payload.messages,
                    // ...state[chatExisted].messages,
                ];
        },
        addNewMessage: (
            state,
            action: PayloadAction<{ chatId: string; message: any }>
        ) => {
            const chatExisted = state.findIndex(
                (chat) => chat.chatId == action.payload.chatId
            );
            if (chatExisted == -1)
                state.push({
                    chatId: action.payload.chatId,
                    messages: [action.payload.message],
                });
            else state[chatExisted].messages.push(action.payload.message);
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetchMessages, addNewMessage } = messagesSlice.actions;

const messageReducer = messagesSlice.reducer;
export default messageReducer;
