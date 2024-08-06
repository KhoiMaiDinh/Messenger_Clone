import { IChat } from "@/types/Chat";
import { IMessage } from "@/types/Message";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EmojiState {
    emojiCode: string;
}

const initialState: EmojiState = { emojiCode: "" };
export const emojiSlice = createSlice({
    name: "emoji",
    initialState,
    reducers: {
        updateEmoji: (
            state,
            action: PayloadAction<{ newEmojiCode: string }>
        ) => {
            const { newEmojiCode } = action.payload;
            console.log({ newEmojiCode });
            state.emojiCode = newEmojiCode;
        },
    },
});

export const { updateEmoji } = emojiSlice.actions;

const emojiReducer = emojiSlice.reducer;
export default emojiReducer;
