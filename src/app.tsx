import React from 'react'
import { createRoot } from 'react-dom/client'
import KaliApp from './components/KaliApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { stateFetchedAsync } from './actions/root'

const App = () => {
    return (
        <Provider store={store}>
            <KaliApp />
        </Provider>
    )
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<p>Loading...</p>)
store.dispatch(stateFetchedAsync())
    .then(() => root.render(<App />))