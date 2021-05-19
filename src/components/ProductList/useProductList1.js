import { useEffect, useState, useMemo, useCallback } from 'react'

const getData = (url, filter) => {
  return fetch(`${url}${filter}`).then(res => {
    if (!res.ok || res.status !== 200) {
      throw new Error(`Request failed with status code ${res.status}`)
    }
    return res.json()
  })
}

const useRequest = request => {
  const initialState = useMemo(
    () => ({
      items: [],
      loading: true,
      error: false,
      filter: {
        category: [],
        isNew: false,
        isLimited: false,
      },
    }),
    []
  )
  const [dataState, setDataState] = useState(initialState)

  useEffect(() => {
    setDataState(initialState)
    let cancelled = false
    request()
      .then(
        data =>
          !cancelled &&
          setDataState({
            items: data.results,
            loading: false,
            error: false,
            ...filter,
          })
      )
      .catch(error =>
        setDataState({
          items: [],
          loading: false,
          error,
          ...filter,
        })
      )
    return () => (cancelled = true)
  }, [request, initialState])
  return dataState
}

export const useProductList = () => {
  const request = useCallback(() => getData('/api/product', ''), [])
  return useRequest(request)
}
