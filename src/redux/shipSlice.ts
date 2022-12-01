import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ShipSlice = {
    xPos: number;
    yPos: number;
}

const initialState: ShipSlice = {
    xPos: window.innerWidth/2,
    yPos: window.innerHeight/2
}

export const shipSlice = createSlice({
    name: 'setup',
    initialState,
    reducers: {
        setX: (state, action: PayloadAction<number>) => {
            state.xPos = action.payload;
        },
        setY: (state, action: PayloadAction<number>) => {
            state.yPos = action.payload;
        }
    }
});

export const { setX, setY } = shipSlice.actions;

export default shipSlice.reducer;