import { IChat } from "@/types/Chat";
import { updateObject } from "@/utils/object";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatsState {
    chats: IChat[];
    avatars: {
        username: string;
        avatar_url: string;
    }[];
}

const initialState: ChatsState = {
    chats: [],
    avatars: [],
};

export const chatsSlice = createSlice({
    name: "chats",
    initialState,
    reducers: {
        fetch: (
            state,
            action: PayloadAction<{ chats: IChat[]; self_username: string }>
        ) => {
            state.avatars = action.payload.chats.map((chat) => {
                const opponent = chat.people.find(
                    (p) => p.person.username != action.payload.self_username
                );
                return {
                    username: opponent?.person.username!,
                    avatar_url: opponent?.person.avatar!,
                };
            });
            state.chats = action.payload.chats;
        },
        add: (state, action: PayloadAction<IChat>) => {
            state.chats.push(action.payload);
        },
        addToBeginning: (state, action: PayloadAction<IChat>) => {
            state.chats.unshift(action.payload);
            console.log("addToBeginning");
        },
        editChat: (state, action: PayloadAction<IChat>) => {
            console.log("edit chat");
            const index = state.chats.findIndex(
                (chat) => chat.id == action.payload.id
            );
            if (
                state.chats[index].last_message.id ==
                action.payload.last_message.id
            )
                Object.assign(state.chats[index], action.payload);
            else {
                state.chats.splice(index, 1);
                state.chats.unshift(action.payload);
            }
        },
        editAndMoveToStart: (state, action: PayloadAction<IChat>) => {
            console.log("editAndMoveToStart");
            const index = state.chats.findIndex(
                (chat) => chat.id == action.payload.id
            );
            if (index == 0) {
                state.chats[0] = action.payload;
                return;
            }
            const removed = state.chats.splice(index, 1);
            state.chats.unshift(action.payload);

            // console.log("1");
            // const removed = state.chats.splice(index, 1);
            // state.chats.splice(index, 1);
            console.log(state.chats);
            // console.log(state.chats);

            // state.chats.unshift(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { fetch, add, addToBeginning, editChat, editAndMoveToStart } =
    chatsSlice.actions;

const chatReducer = chatsSlice.reducer;
export default chatReducer;
