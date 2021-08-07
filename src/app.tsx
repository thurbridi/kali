import React from 'react';
import ReactDOM from 'react-dom';
import KaliApp from './components/KaliApp';

import { StoreProvider } from './store/store'


const App = () => {
  return (
    <StoreProvider>
      <KaliApp />
    </StoreProvider>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
