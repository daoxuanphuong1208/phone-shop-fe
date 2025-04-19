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

export const getAllOrders = async (userId) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/order/getAllOrders?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await res.json();
  return result;
};

export const getOrderDetail = async (orderId) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/order/getOrderDetail/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();
  return result;
};

export const cancelOrder = async (orderId) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/order/cancelOrder/${orderId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();
  return result;
};
