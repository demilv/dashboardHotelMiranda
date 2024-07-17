import { createSlice } from '@reduxjs/toolkit';
import { roomThunk } from './roomThunk';

export const roomSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addRoom: (state, action) => {
            state.rooms = [...state.rooms, action.payload];
        },
        deleteRoom: (state, action) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
        },
        editRoom: (state, action) => {
            const index = state.rooms.findIndex(room => room.id === action.payload.id);
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(roomThunk.pending, (state) => {
                state.status = 'pendinmg';
            })
            .addCase(roomThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.rooms = action.payload;
            })
            .addCase(roomThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    }
});

export default roomSlice.reducer;
export const { addRoom, deleteRoom, editRoom } = roomSlice.actions;
export const roomDataSelect = (state) => state.rooms.rooms
export const roomStatusSelect = (state) => state.rooms.status
export const roomErrorSelect = (state) => state.rooms.error
