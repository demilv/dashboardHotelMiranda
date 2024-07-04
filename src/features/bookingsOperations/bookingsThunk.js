import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingsData from '../../data/bookingsData.json';

export const BookingsThunk = createAsyncThunk('bookings/BookingsThunk', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(bookingsData);
        }, 3000); 
    });
});
