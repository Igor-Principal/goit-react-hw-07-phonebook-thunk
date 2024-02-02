import css from './contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactsThunk } from 'store/contacts/contactThunk';

const Contacts = () => {
  const { contacts } = useSelector(state => state.contacts);
  const { filter } = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const handleClick = e => {
    dispatch(deleteContactsThunk(e.target.id));
  };

  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  const elements = filtered.map(({ name, number, id }) => (
    <li className={css.item} key={id}>
      {name} : {number}
      <button
        className={css.button}
        id={id}
        type="button"
        onClick={handleClick}
      >
        Delete
      </button>
    </li>
  ));
  return (
    <>
      <ul className={css.list}>{elements}</ul>
    </>
  );
};

export default Contacts;
