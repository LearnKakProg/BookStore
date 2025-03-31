import {configureStore} from '@reduxjs/toolkit';
import {booksReducer} from './slices/books';
import {authReducer} from './slices/auth';
import {libraryReducer} from './slices/library';
const store = configureStore({
    reducer: {
        books: booksReducer,
        auth: authReducer,
        library: libraryReducer,
    },
});

export default store;