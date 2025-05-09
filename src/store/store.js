import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counterSlice'; // Update path as needed

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
