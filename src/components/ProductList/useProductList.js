import { useCallback, useEffect, useReducer, useMemo } from 'react'

const initialState = {
  filter: {
    isNew: false,
    isLimited: false,
    category: [],
    term: '',
  },
  status: 'idle', // idle | work | success | error
  items: [],
  loading: true,
  error: false,
  categories: [],
}

const reducer = (state, action) => {
  console.log(`Action: ${action.type}; Payload:`, action.payload)
  switch (action.type) {
    case 'filter:change': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...state.filter,
          ...action.payload,
        },
      }
    }
    case 'filter:reset': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...initialState.filter,
        },
      }
    }
    case 'category:change': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...state.filter,
          category: [...state.filter.category, action.payload],
        },
      }
    }
    case 'category:reset': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...state.filter,
          category: [],
        },
      }
    }
    case 'search:change': {
      return {
        ...state,
        status: 'work',
        filter: {
          ...state.filter,
          term: action.payload,
        },
      }
    }
    case 'request:start': {
      return {
        ...state,
        status: 'work',
        loading: true,
      }
    }
    case 'request:success': {
      return {
        ...state,
        status: 'success',
        items: action.payload,
        loading: false,
      }
    }
    case 'request_categories:success': {
      return {
        ...state,
        status: 'success',
        loading: false,
        categories: action.payload,
      }
    }

    case 'request:error': {
      return {
        ...state,
        status: 'error',
        loading: false,
        error: true,
      }
    }
  }
}

const getData = (url, filter) => {
  return fetch(`${url}${filter}`).then(res => {
    if (!res.ok || res.status !== 200) {
      throw new Error(`Request failed with status code ${res.status}`)
    }
    return res.json()
  })
}
export const useProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const updateFilter = useCallback((filter = {}) => dispatch({ type: 'filter:change', payload: filter }), [])
  const resetFilter = useCallback(() => dispatch({ type: 'filter:reset' }), [])
  const updateCategory = useCallback(
    (filter = {}) => dispatch({ type: 'category:change', payload: filter.category }),
    []
  )
  const resetCategory = useCallback((filter = {}) => dispatch({ type: 'category:reset', payload: filter.category }), [])
  const getCategories = useMemo(() => {
    dispatch({ type: 'request:start' })

    getData('/api/category', '')
      .then(data => dispatch({ type: 'request_categories:success', payload: data }))
      .catch(err => {
        console.error(err)
        dispatch({ type: 'request:error' })
      })
  }, [])

  useEffect(() => {
    getCategories
  }, [getCategories])

  const searchItems = useCallback((filter = {}) => dispatch({ type: 'search:change', payload: filter.term }), [])
  useEffect(() => {
    searchItems
  }, [searchItems])

  const performRequest = useCallback(() => {
    dispatch({ type: 'request:start' })

    // prettier-ignore
    const serializeFilter = filter => {

      let query = [
        ...filter.category.map(categoryId => `category[]=${categoryId}`),
        `isNew=${filter.isNew}`,
        `isLimited=${filter.isLimited}`
      ]
    if (filter.term.length > 0) {
      query = [
        ...query,
        `search=${filter.term}`
      ]
    }

    return query.join('&')
    
  }

    getData('/api/product?', serializeFilter(state.filter))
      .then(data => dispatch({ type: 'request:success', payload: data.results }))
      .catch(err => {
        console.error(err)
        dispatch({ type: 'request:error' })
      })
  }, [state.filter])

  useEffect(() => {
    performRequest()
  }, [performRequest])

  return {
    ...state,
    updateFilter,
    resetFilter,
    updateCategory,
    resetCategory,
    getCategories,
    searchItems,
  }
}
