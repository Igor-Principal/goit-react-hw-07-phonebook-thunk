import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { initialStore } from 'store/initialState';
import {
  createContactsThunk,
  deleteContactsThunk,
  getContactsThunk,
} from './contactThunk';

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
  state.contacts = payload;
};

const handleFulfilledCreate = (state, { payload }) => {
  state.contacts.push(payload);
};

const handleFulfilledDelete = (state, { payload }) => {
  state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialStore.contacts,
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
