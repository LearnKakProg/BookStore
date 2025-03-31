import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchLibrary = createAsyncThunk('/library/fetchLibrary', async (id) => {
    const { data } = await axios.get(`/library/${id}`);
    return data;
});

const initialState = {
    library: {
        items: [],
        status: 'loading',
    }
};
const librarySlice = createSlice({
name: 'library',
initialState,
reducers: {},
extraReducers:{


    [fetchLibrary.pending]: (state) => {
        state.library.items = [];
        state.library.status = 'loading';
    },
    [fetchLibrary.fulfilled]: (state, action) => {
        state.library.items = action.payload;
        state.library.status = 'loaded';
    },
    [fetchLibrary.rejected]: (state) => {
        state.library.items = [];
        state.library.status = 'error';
    },

},
});

export const libraryReducer = librarySlice.reducer;