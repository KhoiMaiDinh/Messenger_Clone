import { IChat } from "@/types/Chat";
import { updateObject } from "@/utils/object";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatsState {
    chats: IChat[];
}

const initialState: ChatsState = {
    chats: [],
};

export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        fetch: (state, action: PayloadAction<IChat[]>) => {
            state.chats = action.payload;
        },
        add: (state, action: PayloadAction<IChat>) => {
            state.chats.push(action.payload);
        },
        addToBeginning: (state, action: PayloadAction<IChat>) => {
            state.chats.unshift(action.payload);
        },
        editChat: (state, action: PayloadAction<IChat>) => {
            const index = state.chats.findIndex(
                (chat) => chat.id == action.payload.id
            );
            Object.assign(state.chats[index], action.payload);
        },
        editAndMoveToStart: (state, action: PayloadAction<IChat>) => {
            const index = state.chats.findIndex(
                (chat) => chat.id == action.payload.id
            );
            if (index == 0) {
                updateObject(state.chats[0], action.payload);
            }
            // const removed = state.chats.splice(index, 1);
            // state.chats.unshift(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetch, add, addToBeginning, editChat, editAndMoveToStart } =
    chatsSlice.actions;

const chatReducer = chatsSlice.reducer;
export default chatReducer;
