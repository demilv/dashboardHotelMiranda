import { createSlice } from '@reduxjs/toolkit';
import { reviewThunk } from './reviewThunk';

export const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        status: 'idle',
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(reviewThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(reviewThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.reviews = action.payload;
            })
            .addCase(reviewThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    }
});

export default reviewSlice.reducer;
export const reviewDataSelect = (state) => state.reviews.reviews;
export const reviewStatusSelect = (state) => state.reviews.status;
export const reviewErrorSelect = (state) => state.reviews.error;
