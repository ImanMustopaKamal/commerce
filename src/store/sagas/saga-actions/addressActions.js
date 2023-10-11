import { get, post, put } from "@/utils/interceptors";

export const getAddress = (payload) => {
  return get(`/addresses?page=-1`);
};

export const myAddress = (payload) => {
  return get(`/my-addresses`);
};

export const getDetailAddress = (payload) => {
  return get(`/addresses/${payload}`);
};

export const postAddress = (payload) => {
  return post("/addresses", payload);
};

export const putAddress = (payload, id) => {
  return put(`/addresses/${id}`, payload);
};

export const deleteAddress = (payload) => {
  return delete `/addresses/${payload}`;
};
