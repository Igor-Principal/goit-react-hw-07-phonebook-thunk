import { combineReducers } from 'redux';
import { contactReducer } from './contacts/contactSlice';
import { filterReducer } from './filter/filterSlice';

export const reducer = combineReducers({
  contacts: contactReducer,
  filter: filterReducer,
});
