import { createSlice } from '@reduxjs/toolkit';
import { addUserToMailList } from '../utils/thunk';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        action: {}
    },
    reducers: {
        // Add reducers here
        clearNewsLetter: (state, action) => {
            state.action = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addUserToMailList.pending((state,action) => {
        console.log('pending!!!');
        }))
        builder.addCase(addUserToMailList.fulfilled((state,action) => {
            state.action = action.payload;
        }))
        builder.addCase(addUserToMailList.rejected((state,action) => {
            console.log('rejected!!!');
        }))
    }
});

export const {clearNewsLetter} = usersSlice.actions;

export default usersSlice.reducer;
