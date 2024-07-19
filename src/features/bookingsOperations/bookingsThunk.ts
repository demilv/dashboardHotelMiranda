import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingsData from '../../data/bookingsData.json';

export const BookingsThunk = createAsyncThunk('bookings/BookingsThunk', async () => {
    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (bookingsData.length > 0) {
                resolve(bookingsData);
            }else{
                reject("no encontrado")
            }
        }, 3000); 
    });
    return promesa.then((resolve) => {return resolve}
    ).catch((error) => {throw new Error(error)})
});
