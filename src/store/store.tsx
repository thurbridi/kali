import React, { createContext, useReducer } from "react";
import { appReducer, initialAppState } from '../reducers/app'
import type { Action, AppState, AppReducer } from '../types/types'



// type StoreContextType = {
//     state: AppState
//     dispatch: React.Dispatch<Action>
// }

// const store = createContext<StoreContextType | null>(null)
const store = createContext(null)

const { Provider } = store

const StoreProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer<AppReducer>(appReducer, initialAppState)

    return <Provider value={{ state, dispatch }}> {children}</Provider >
}

export { store, StoreProvider }