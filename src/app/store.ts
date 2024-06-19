import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chat/chatSlice";

export const store = configureStore({
    reducer: {
        chats: chatReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
