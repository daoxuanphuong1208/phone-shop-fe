import axios from "axios";

export const getAllContacts = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/contact/getAllContacts`
  );
  return res.data;
};

export const createContact = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/contact/create`,
    data
  );
  return res.data;
};

export const updateContact = async (id, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/contact/update/${id}`,
    data
  );
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/contact/delete/${id}`
  );
  return res.data;
};
