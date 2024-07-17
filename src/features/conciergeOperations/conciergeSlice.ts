import { createSlice } from '@reduxjs/toolkit';
import { conciergeUsersThunk } from './conciergeUsersThunk';

export const conciergeSlice = createSlice({
    name: 'conciergeUsers',
    initialState: {
        conciergeUsers: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addUser: (state, action) => {
            state.conciergeUsers = [...state.conciergeUsers, action.payload];
        },
        deleteUser: (state, action) => {
            state.conciergeUsers = state.conciergeUsers.filter(user => user.id !== action.payload);
        },
        editUser: (state, action) => {
            const index = state.conciergeUsers.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.conciergeUsers[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(conciergeUsersThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(conciergeUsersThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.conciergeUsers = action.payload;
            })
            .addCase(conciergeUsersThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            });
    }
});

export default conciergeSlice.reducer;
export const { addUser, deleteUser, editUser } = conciergeSlice.actions;
export const conciergeDataSelect = (state) => state.conciergeUsers.conciergeUsers;
export const conciergeStatusSelect = (state) => state.conciergeUsers.status;
export const conciergeErrorSelect = (state) => state.conciergeUsers.error;
