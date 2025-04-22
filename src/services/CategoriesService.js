import axios from "axios";

export const getAllCategories = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/categories/getAll`
  );
  return res.data;
};

export const createCategory = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/categories/create`,
    data
  );
  return res.data;
};

export const updateCategory = async (id, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/categories/update/${id}`,
    data
  );
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/categories/delete/${id}`
  );
  return res.data;
};
