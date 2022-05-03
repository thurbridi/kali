import React from 'react'
import ReactDOM from 'react-dom'
import KaliApp from './components/KaliApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { sourcesFetchedAsync } from './actions/sources'
import { activitiesFetchedAsync } from './actions/activities'


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

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'))

// FIXME: dispatching many actions sequentially (https://redux.js.org/style-guide/#avoid-dispatching-many-actions-sequentially)
store.dispatch(sourcesFetchedAsync())
    .then(() => store.dispatch(activitiesFetchedAsync()))
    .then(() => ReactDOM.render(<App />, document.getElementById('root')))