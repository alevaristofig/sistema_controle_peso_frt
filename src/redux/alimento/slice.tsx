import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    alimentos: {
        'dados': []
    },
    loading: false
}

export const alimentoSlice = createSlice({
    name: 'alimento',
    initialState,
    reducers: {}
});

export const {} = alimentoSlice.actions;

export default alimentoSlice.reducer;