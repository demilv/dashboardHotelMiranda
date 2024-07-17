import { createAsyncThunk } from "@reduxjs/toolkit";
import conciergeData from '../../data/conciergeData.json';

export const conciergeUsersThunk = createAsyncThunk('conciergeUsers/conciergeUsersThunk', async () => {
    const promesa = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (conciergeData.length > 0) {
                resolve(conciergeData);
            }else{
                reject("no encontrado")
            }
        }, 3000); 
    });
    return promesa.then((resolve) => {return resolve}
    ).catch((error) => {throw new Error(error)})
});
