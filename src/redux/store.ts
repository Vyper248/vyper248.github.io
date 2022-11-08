import { configureStore } from "@reduxjs/toolkit";
import setupReducer from "./setupSlice";

import { Middleware } from '@reduxjs/toolkit';

const localStorageMiddleware: Middleware = ({getState}) => next => action => {
	const result = next(action);
    
	let state = getState();

	localStorage.setItem('vyper-portfolio-state', JSON.stringify(state));
	return result;
};

const reHydrateStore = () => {
    let storedState = localStorage.getItem('vyper-portfolio-state');

	if (storedState !== null) {
		return JSON.parse(storedState);
	}
};

export const store = configureStore({
    reducer: {
        setup: setupReducer
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;