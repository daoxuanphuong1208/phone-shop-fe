import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-in`,
    data
  );
  return res.data;
};

export const signUpUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/sign-up`,
    data
  );
  return res.data;
};

export const updateUser = async (data) => {
  const { id, access_token, ...body } = data;
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    body,
    {
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
    {
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getAll`);
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/reset-password`,
    data
  );
  return res.data;
};

export const forgotPassword = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/forgot-password`,
    data
  );
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`
  );
  return res.data;
};
