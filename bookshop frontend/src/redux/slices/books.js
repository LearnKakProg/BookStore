import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchBooks = createAsyncThunk('/books/fetchBooks', async () => {
    const { data } = await axios.get('/books');
    return data;
});

export const fetchDeletePost = createAsyncThunk('books/fetchDeleteBooks', async (id) => {
    axios.delete(`/books/${id}`);
});

const initialState = {
    books: {
            items: [],
            status: 'loading',
    },
    booksSorted: {
        items: []
    }
};
const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
    },
    extraReducers:{
        
        [fetchBooks.pending]: (state) => {
            state.books.items = [];
            state.books.status = 'loading';
        },
        [fetchBooks.fulfilled]: (state, action) => {
            state.books.items = action.payload;
            state.books.status = 'loaded';
        },
        [fetchBooks.rejected]: (state) => {
            state.books.items = [];
            state.books.status = 'error';
        },

        [fetchDeletePost.pending]: (state, action) => {
            state.books.items = state.books.items.filter(obj => obj._id !== action.meta.arg);//можно и просто страницу обновить
        },
        [fetchDeletePost.rejected]: (state) => {
            state.books.status = 'error';
        },
    },
});

export const booksReducer = booksSlice.reducer;