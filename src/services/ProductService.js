import axios from "axios";

export const getAllProduct = async ({
  filter,
  search,
  limit,
  page,
  sort,
  order,
} = {}) => {
  const params = {};

  if (search) {
    params.search = search;
    params.filter = filter;
  }

  if (limit !== undefined) params.limit = limit;
  if (page !== undefined) params.page = page;
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/getAll`,
    {
      params,
    }
  );

  return res.data;
};

export const createProduct = async (data) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/product/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};

export const updateProduct = (id, token, payload) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/product/update-product/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  ).then((res) => res.json());
};

export const deleteProduct = (id, token) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/product/delete-product/${id}`,
    {
      method: "DELETE",
      headers: {
        token: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());
};
