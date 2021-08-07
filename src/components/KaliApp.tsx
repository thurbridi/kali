import React from 'react'


import { StoreProvider } from '../store/store'
import 'react-responsive-modal/styles.css';
import ActivityList from './ActivityList';
import SourceList from './SourceList';


const KaliApp = () => {
  return (
    <StoreProvider>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SourceList />
        <ActivityList title='Backlog' />
        <ActivityList title='Available' />
        <ActivityList title='Doing' />
        <ActivityList title='Done' />
      </div >
    </StoreProvider>
  )
}

export default KaliApp