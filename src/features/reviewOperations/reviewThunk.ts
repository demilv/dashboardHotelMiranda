import { createAsyncThunk } from "@reduxjs/toolkit";
import reviewData from '../../data/roomReview.json';

export const reviewThunk = createAsyncThunk('reviews/reviewThunk', async () => {
    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (reviewData.length > 0) {
                resolve(reviewData);
            }else{
                reject("no encontrado")
            }
        }, 3000); 
    });
    return promesa.then((resolve) => {return resolve}
    ).catch((error) => {throw new Error(error)})
});
