import { get, post, put } from "@/utils/interceptors";

export const postTransaction = (payload) => {
  return post("/transaction", payload);
};

export const getDetailTransaction = (payload) => {
  return get(`/transaction/${payload}`);
};

export const getTransaction = (payload) => {
  return get("/transaction", payload);
}

export const historyTransaction = (payload) => {
  return get("/transaction/history?page=-1");
}

export const historyTransactionDetail = (payload) => {
  return get(`/transaction/history?page=1&itemPerPage=1&orderId=${payload}`);
}