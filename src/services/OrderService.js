export const createOrder = async ({ access_token, ...data }) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/order/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: `Bearer ${access_token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};
