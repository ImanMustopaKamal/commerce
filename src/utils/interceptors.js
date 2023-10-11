import axios from "axios"
import { Logger } from "./logger"
import { getStorage } from "./storage"

/**
 *
 * Log Responser
 *
 * @param {*} res
 * @returns
 */

export const logResponser = (res) => {
  if (!res) return null
  const { config } = res
  const loadTime = performance.now()
  const url = config.url.replace(process.env.NEXT_PUBLIC_API_URL, '')

  //* Send Response to logger
  Logger(`${config.method.toUpperCase()} ${url}`, {
    responseTime: loadTime,
    status: res.status,
    statusText: res.statusText,
    error: res?.data?.meta?.error || '',
    message: res?.data?.meta?.message || ''
  })
}

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: {
      toString () {
        return `Bearer ${getStorage('accessToken')}`
      }
    },
    version: process.env.NEXT_PUBLIC_VERSION || 'v1.0.0'
  }
})

service.interceptors.response.use(function (res) {
  if (process.env.NODE_ENV !== 'production')
    logResponser(res)
  return res
}, function (error) {
  const err = error?.response
  if (process.env.NODE_ENV !== 'production')
    logResponser(err)
  return Promise.reject(err)
})

/**
 *
 * Function Get Axios
 *
 * @param {String} url
 * @param {*} params
 */
export const get = (url, params) => {
  return service.get(`${url}`,
    params
  )
}

/**
 *
 * Function Post Axios
 *
 * @param {String} url
 * @param {*} body
 */
export const post = (url, body) => {
  return service.post(`${url}`, body)
}

/**
 *
 * Function Put Axios
 *
 * @param {String} url
 * @param {*} body
 */
export const put = (url, body) => {
  return service.put(`${url}`, body)
}

/**
 *
 * Function Delete Axios
 *
 * @param {String} url
 * @param {*} params
 */
export const del = (url, params) => {
  return service.del(`${url}`, params)
}

/**
 *
 * Custom Function getBlob response
 *
 * @param {String} url
 * @param {*} params
 */

export const getBlob = (url, params) => {
  return service.get(`${url}`, {
    params,
    responseType: 'blob'
  })
}

export const postBlob = (url, body) => {
  return service.post(`${url}`, body, {
    responseType: 'blob'
  })
}