import { get, post, put } from "@/utils/interceptors";

export const domesticPricing = (payload) => {
  return post("/domestic-pricing", payload);
};