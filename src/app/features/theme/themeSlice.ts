import { IChat } from "@/types/Chat";
import { IMessage } from "@/types/Message";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import ThemeSet from "./themeConstance";

export interface ThemeState {
    key: string;
    name: string;
    startColor: string;
    middleColor: string;
    endColor: string;
    backgroundImage: string;
    isTextWhite: boolean;
}

const initialState: ThemeState = ThemeSet.DEFAULT_THEME;
export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        updateTheme: (
            state,
            action: PayloadAction<{ newTheme: ThemeState }>
        ) => {
            console.log({ new: action.payload?.newTheme });
            if (!action.payload.newTheme)
                action.payload.newTheme = ThemeSet.DEFAULT_THEME;
            const {
                name,
                backgroundImage,
                startColor,
                middleColor,
                endColor,
                key,
                isTextWhite,
            } = action.payload?.newTheme;
            state.name = name;
            state.backgroundImage = backgroundImage;
            state.startColor = startColor;
            state.middleColor = middleColor;
            state.endColor = endColor;
            state.key = key;
            state.isTextWhite = isTextWhite;
        },
    },
});

export const { updateTheme } = themeSlice.actions;

const themeReducer = themeSlice.reducer;
export default themeReducer;
