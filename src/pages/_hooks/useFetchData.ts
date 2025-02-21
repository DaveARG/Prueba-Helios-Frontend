/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios"
import { useState } from "react"

type useFetchDataProps<T> = AxiosRequestConfig & {
  onSuccess?: (response: T, objCb?: Record<string, unknown>) => void
  onError?: (error: any) => void
  onFinish?: () => void
}

export default function useFetchData<T>() {
  const [isloading, setLoading] = useState(false)
  const [isfinish, setFinish] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState<T>()

  function fetchData({
    onSuccess = () => {},
    onError = () => {},
    onFinish = () => {},
    ...propsAxios
  }: useFetchDataProps<T>) {
    setLoading(true)

    axios(propsAxios)
      .then((response) => {
        setResponse(response.data)
        onSuccess(response.data)
      })
      .catch((error) => {
        setError(error)
        onError(error)
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        setFinish(true)
        onFinish()
      })
  }

  return { isloading, response, isfinish, error, setError, fetchData }
}
