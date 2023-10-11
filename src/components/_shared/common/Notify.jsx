/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setResponserMessage } from '@/store/reducers/slice/responserSlice';
import { useAppDispatch } from '@/hooks';

function Notify({ type, message }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (type == 'error') {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER
      })
    }else{
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }, [type])

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: setResponserMessage.toString(), payload: {
        code: 0,
        message: null
      } })
    }, 4000)
  }, [])
  return (
    <ToastContainer autoClose={2500} theme='colored' hideProgressBar/>
  )
}

export default Notify