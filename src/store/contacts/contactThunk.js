import { createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContact, getContacts } from 'services/contactsApi';

export const getContactsThunk = createAsyncThunk('contacts/getAll', () =>
  getContacts()
);

export const createContactsThunk = createAsyncThunk(
  'contacts/addContact',
  data => addContact(data)
);

export const deleteContactsThunk = createAsyncThunk(
  'contacts/deleteContact',
  id => deleteContact(id)
);
