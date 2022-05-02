import React from 'react'
import ReactDOM from 'react-dom'
import KaliApp from './components/KaliApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { sourcesFetchedAsync } from './actions/sources'


store.subscribe(() => console.log('sources', store.getState().sources))
store.subscribe(() => console.log('activities', store.getState().activities))

const App = () => {
    return (
        <Provider store={store}>
            <KaliApp />
        </Provider>
    )
}

store.subscribe(() => {
    console.log(store.getState())
})

console.log('hey')

// ReactDOM.render(<App />, document.getElementById('root'))


ReactDOM.render(<p>Loading...</p>, document.getElementById('root'))

store.dispatch(sourcesFetchedAsync()).then(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})