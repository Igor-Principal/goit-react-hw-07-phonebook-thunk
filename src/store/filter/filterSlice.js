import { createSlice } from '@reduxjs/toolkit';
import { initialStore } from 'store/initialState';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStore.filter,
  reducers: {
    filterValue: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export const filterReducer = filterSlice.reducer;

export const { filterValue } = filterSlice.actions;
