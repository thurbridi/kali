import React, { createContext, useReducer, useEffect } from "react";
import { appReducer, initialAppState } from '../reducers/app'
import type { AppReducer } from '../types/types'


const store = createContext(null)

const { Provider } = store

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<AppReducer>(appReducer, initialAppState)

  useEffect(() => {
    window.api.loadState().then(state => {
      dispatch({
        type: 'LOAD_LOCAL_DATA',
        payload: { ...state }
      })
    }).catch(() => {
      console.log('No local data available')
    })
  }, [])

  useEffect(() => {
    window.api.saveState(state)
    console.log(state)
  }, [state])

  return <Provider value={{ state, dispatch }}> {children}</Provider >
}

export { store, StoreProvider }