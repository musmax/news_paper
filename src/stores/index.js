import {configureStore} from '@reduxjs/toolkit'
import postReducer from './reducers/posts'
import userReducer from './reducers/users'

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: userReducer
    }
})

export default store;