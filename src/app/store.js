import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/roomOperations/roomSlice';

export const store = configureStore({
    reducer: {
        rooms: roomReducer,
    },
});