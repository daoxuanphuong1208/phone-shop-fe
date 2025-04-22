import axios from "axios";

export const getAllSliders = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/slider/getAll`);
  return res.data;
};

export const createSlider = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/slider/create`,
    data
  );
  return res.data;
};

export const deleteSlider = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/slider/delete/${id}`
  );
  return res.data;
};
