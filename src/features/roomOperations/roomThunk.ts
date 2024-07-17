import { createAsyncThunk } from "@reduxjs/toolkit";
import roomData from '../../data/roomData.json';

export const roomThunk = createAsyncThunk('rooms/roomThunk', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(roomData);
        }, 3000);
    });
});
