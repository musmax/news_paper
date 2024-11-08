import { createSlice } from '@reduxjs/toolkit';
import { fetchPostById, fetchPosts } from '../utils/thunk';

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        loading: true,
        articles: {
            items: [],
        },
        postById: null,
        error: null 
    },
    reducers: {
        clearPostById:(state, action) => {
            state.postById = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch posts';
        });
        builder.addCase(fetchPostById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPostById.fulfilled, (state, action) => {
            state.loading = false;
            state.postById = action.payload;
        });
        builder.addCase(fetchPostById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const {clearPostById} = postsSlice.actions;

export default postsSlice.reducer;
