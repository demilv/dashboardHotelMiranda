import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewData from '../../data/roomReview.json';

export const reviewThunk = createAsyncThunk('reviews/reviewThunk', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(reviewData);
        }, 3000);
    });
});
