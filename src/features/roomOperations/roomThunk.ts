import { createAsyncThunk } from "@reduxjs/toolkit";
import roomData from '../../data/roomData.json';

export const roomThunk = createAsyncThunk('rooms/roomThunk', async () => {
    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (roomData.length > 0) {
                resolve(roomData);
            }else{
                reject("no encontrado")
            }
        }, 3000); 
    });
    return promesa.then((resolve) => {return resolve}
    ).catch((error) => {throw new Error(error)})
});