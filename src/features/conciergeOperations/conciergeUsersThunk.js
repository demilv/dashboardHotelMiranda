import { createAsyncThunk } from "@reduxjs/toolkit";
import conciergeData from '../../data/conciergeData.json';

export const conciergeUsersThunk = createAsyncThunk('conciergeUsers/conciergeUsersThunk', async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(conciergeData);
        }, 3000); 
    });
});
