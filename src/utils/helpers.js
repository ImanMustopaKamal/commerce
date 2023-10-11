import store from "@/store"
import { setResponserMessage } from "@/store/reducers/slice/responserSlice"

export const formatRupiah = (number = 0) => {
  let rupiah = ''
  const numberRev = number.toString().split('').reverse().join('')

  for (let i = 0; i < numberRev.length; i++) if (i % 3 == 0) rupiah += numberRev.substr(i, 3) + '.'
  rupiah = rupiah.split('', rupiah.length - 1).reverse().join('')
  return 'Rp ' + (rupiah.length < 1 ? '0' : rupiah)
}


export const checkRegulerExpression = (expression, value) => {
  const regex = new RegExp(expression)
  const stringValue = value.toString()
  return regex.test(stringValue)
}

export const convertDateValue = (name, event) => {
  console.log('helpers', event)
  return {
    target: {
      name, value: event.$d
    }
  }
}

export const linearColor = 'linear-gradient(90deg, rgba(50,150,200,1) 0%, rgba(100,157,148,1) 50%, rgba(185,167,57,1) 100%)'

export const copyToClipboard = (value, message) => {
  navigator.clipboard.writeText(value)
  store.dispatch(setResponserMessage({
    code: 200,
    message: message
  }))
}