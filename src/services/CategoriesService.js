import axios from "axios";

export const getAllCategories = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/categories/getAll`
  );
  return res.data;
};
