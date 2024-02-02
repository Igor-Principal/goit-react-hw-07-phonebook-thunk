import css from './app.module.css';
import Phonebook from './Phonebook/Phonebook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getContactsThunk } from 'store/contacts/contactThunk';
import Loader from './Loader/Loader';
import { contactsSelector } from 'store/contacts/contactsSelectors';

export const App = () => {
  const { contacts, error, isLoading } = useSelector(contactsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <Phonebook />
      {isLoading && <Loader />}
      {contacts.length > 0 && (
        <>
          <h2 className={css.title}>Contacts</h2>
          <Filter />

          <Contacts />
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};
