import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  createContactsThunk,
  deleteContactsThunk,
  getContactsThunk,
} from './contactThunk';
import { initialStateContact } from './initialStateContacts';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const arrThunks = [createContactsThunk, deleteContactsThunk, getContactsThunk];

const fn = type => {
  return arrThunks.map(el => el[type]);
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFilfilled = state => {
  state.isLoading = false;
  state.error = '';
};
const handleFulfilledGet = (state, { payload }) => {
  state.contacts = payload.data;
};

const handleFulfilledCreate = (state, { payload }) => {
  state.contacts.push(payload.data);
};

const handleFulfilledDelete = (state, { payload }) => {
  state.contacts = state.contacts.filter(contact => contact.id !== payload.data.id);
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialStateContact,
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = STATUS;
    builder
      .addCase(getContactsThunk.fulfilled, handleFulfilledGet)
      .addCase(createContactsThunk.fulfilled, handleFulfilledCreate)
      .addCase(deleteContactsThunk.fulfilled, handleFulfilledDelete)
      .addMatcher(isAnyOf(...fn(PENDING)), handlePending)
      .addMatcher(isAnyOf(...fn(REJECTED)), handleRejected)
      .addMatcher(isAnyOf(...fn(FULFILLED)), handleFilfilled);
  },
});

export const contactReducer = contactSlice.reducer;
