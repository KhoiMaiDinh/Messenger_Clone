import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chat/chatSlice";
import messageReducer from "./features/message/messageSlice";
import themeReducer from "./features/theme/themeSlice";
import emojiReducer from "./features/emoji/emojiSlice";

export const store = configureStore({
    reducer: {
        chats: chatReducer,
        messages: messageReducer,
        theme: themeReducer,
        emoji: emojiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
