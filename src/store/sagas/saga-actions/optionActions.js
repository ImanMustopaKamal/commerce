import { get } from "@/utils/interceptors"

export const getProvince = () => {
  return get('/provinces')
}

export const getCity = (payload) => {
  return get(`/cities?province=${payload}`)
}

export const getDistrict = (payload) => {
  return get(`/sub-districts?city=${payload}&itemPerPage=100`)
}

export const getArea = (payload) => {
  return get(`/areas?district=${payload}&itemPerPage=1000`,)
}