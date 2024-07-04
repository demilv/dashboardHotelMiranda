import { configureStore } from '@reduxjs/toolkit';
import roomReducer from '../features/roomOperations/roomSlice';
import conciergeReducer from '../features/conciergeOperations/conciergeSlice';
import bookingsReducer from '../features/bookingsOperations/bookingsSlice'

export const store = configureStore({
    reducer: {
        rooms: roomReducer,
        conciergeUsers: conciergeReducer,
        bookings: bookingsReducer,
    },
});
