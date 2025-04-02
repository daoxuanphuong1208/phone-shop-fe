import axios from "axios";

export const getAllProduct = async (access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/getAll`,
    {
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};


