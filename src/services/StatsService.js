import axios from "axios";

export const getStats = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/stats/getStats`
  );
  return res.data;
};
