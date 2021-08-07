import React, { createContext, useReducer, useEffect } from "react";
import { appReducer, initialAppState } from '../reducers/app'
import type { Action, AppState, AppReducer } from '../types/types'


const store = createContext(null)

const { Provider } = store

const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<AppReducer>(appReducer, initialAppState)

  useEffect(() => {

    console.log('loading state')

    window.api.loadState().then(state => {
      console.log(state)
      dispatch({
        type: 'LOAD_LOCAL_DATA',
        payload: { ...state }
      })
    })

  }, [])

  useEffect(() => {
    console.log('state changed')
    window.api.saveState(state)
  }, [state])

  return <Provider value={{ state, dispatch }}> {children}</Provider >
}

export { store, StoreProvider }