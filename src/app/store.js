import { configureStore } from '@reduxjs/toolkit';
import cinemaReducer from '../reducer/cinemaReducer';

export default configureStore({
    reducer: {
        cinema: cinemaReducer
    }
})