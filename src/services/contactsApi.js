import axios from "axios";

const BASE_URL = 'https://65bbc27e52189914b5bd0541.mockapi.io/api';

export async function getContacts() {
  return await axios.get(`${BASE_URL}/contacts`);
}

export async function addContact(data) {
  return await axios.post(`${BASE_URL}/contacts`, data);
}

export async function deleteContact(id) {
  return await axios.delete(`${BASE_URL}/contacts/${id}`);
}
