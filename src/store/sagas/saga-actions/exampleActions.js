import { get } from '@/utils/interceptors'

export const getExample = (payload) => {
  return get('/example', payload)
}