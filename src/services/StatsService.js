import axios from "axios";

export const getStats = async (year) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/stats/getStats`,
    {
      params: { year },
    }
  );
  return res.data;
};
