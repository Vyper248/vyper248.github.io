import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Style = 'light' | 'dark';
type DisplayMode = 'normal' | 'minimal';

type SetupState = {
    displayMode: DisplayMode;
    style: Style;
}

const initialState: SetupState = {
    displayMode: 'minimal',
    style: 'light'
}

export const setupSlice = createSlice({
    name: 'setup',
    initialState,
    reducers: {
        setStyle: (state, action: PayloadAction<Style>) => {
            state.style = action.payload;
        },
        setDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
            state.displayMode = action.payload;
        }
    }
});

export const { setStyle, setDisplayMode } = setupSlice.actions;

export default setupSlice.reducer;