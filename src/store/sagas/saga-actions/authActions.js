import { post, get } from "@/utils/interceptors"

export const postLogin = (payload) => {
  return post('/authentication/login', payload?.data)
}

export const postRegister = (payload) => {
  return post('/authentication/register', payload)
}

export const getUsers = () => {
  return get('/authentication/me')
}