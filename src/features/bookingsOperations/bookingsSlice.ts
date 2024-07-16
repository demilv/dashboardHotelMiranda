import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store';
import { BookingsThunk } from './bookingsThunk';
import { Booking } from '../Types/typeInterfaces';

interface interfaceState {
    bookings: Booking[],
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    error: string | null
}

const initialState: interfaceState = {
    bookings: [],
    status: 'idle', 
    error: null,
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        deleteBooking: (state, action) => {
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        },
        editBooking: (state, action) => {
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(BookingsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(BookingsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.bookings = action.payload as Booking[];
            })
            .addCase(BookingsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            });
    }
});

export const { deleteBooking, editBooking } = bookingsSlice.actions;
export const bookingsDataSelect = (state: RootState) => state.bookings.bookings;
export const bookingsStatusSelect = (state: RootState) => state.bookings.status;
export const bookingsErrorSelect = (state: RootState) => state.bookings.error;

export default bookingsSlice.reducer;
