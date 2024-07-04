import { createSlice } from '@reduxjs/toolkit';
import { BookingsThunk } from './bookingsThunk';

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [],
        status: 'idle',
        error: null,
    },
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
                state.bookings = action.payload;
            })
            .addCase(BookingsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    }
});

export const { deleteBooking, editBooking } = bookingsSlice.actions;
export const bookingsDataSelect = (state) => state.bookings.bookings;
export const bookingsStatusSelect = (state) => state.bookings.status;
export const bookingsErrorSelect = (state) => state.bookings.error;

export default bookingsSlice.reducer;
