import { getStorage } from "@/utils/storage"
import Router from "next/router"
import store from "@/store"
import { setResponserMessage } from "@/store/reducers/slice/responserSlice"

export const redirectFromServer = (res, location) => {
  res.writeHead(302, {
    Location: `${location}?expired=true`,
    'Content-Type': 'text/html; charset=utf-8'
  })
  res.end()
}

export async function authProps (path) {

  const token = await getStorage('accessToken')

  if (typeof token !== 'undefined' && token !== null) {
    const props = {
      isAuth: true
    }
    Router.push(path)
    return props
  } else {
    const props = {
      isAuth: false
    }
    store.dispatch(setResponserMessage({
      code: 401,
      message: 'Youre not Logged in!'
    }))
    Router.push({ pathname: '/auth/login', query: { toUrl: path } })
    return props
  }
}