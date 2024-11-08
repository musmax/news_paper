import {createAsyncThunk} from '@reduxjs/toolkit'

import axios from 'axios';

const DB_SERVER = 'http://localhost:3001'


export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async({page=1, limit=10, order='desc'}, {getState}) => {
        try {
            const response = await axios.get(`${DB_SERVER}/posts?_page=${page}&_limit=${limit}&_order=${order}&_sort=id`);
            const prevData = getState().posts;
            const newPosts = [...prevData.articles.items, ...response.data];
            return {
                items: newPosts,
                page: page,
                end: response.data.length === 0 ? true : false
            };
        } catch (error) {
            throw error;
        }
    },

);

export const fetchPostById = createAsyncThunk(
    'posts/fetchPostById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${DB_SERVER}/posts/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const sendUserMessage = createAsyncThunk(
    'users/sendUserMessage', 
    async (data) => {
        try {
            await axios({
                url: `${DB_SERVER}/contact`,
                method: 'POST',
                data
            })
            return data;
        } catch (error) {
            throw error;
        }
    }

);

export const addUserToMailList = createAsyncThunk(
    'users/addUserToMailList', 
    async (data) => {
        try {
            // lets get the user from the db
            const user = await axios.get(`${DB_SERVER}/newsletter?email=${data.email}`);
            if (!Array.isArray(user.data) || !user.data.length) {
                // lets add the new user
              await axios({
                    url: `${DB_SERVER}/newsletter`,
                    method: 'POST',
                    data: {
                        email: data.email
                    }
                })
                return {
                    email: data.email,
                    newsletter: 'added',
                }
            }
            else {
                // user is already in the list
                return {
                    newsletter: 'failed',
                }
            }
        } catch (error) {
            throw error;
        }
    }

);


