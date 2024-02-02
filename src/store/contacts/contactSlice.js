import { createSlice } from '@reduxjs/toolkit';
import { initialStore } from 'store/initialState';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialStore.contacts,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});
export const contactReducer = contactSlice.reducer;

export const { addContact, deleteContact } = contactSlice.actions;
