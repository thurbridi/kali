import React from 'react'
import ActivityList from './ActivityList';
import SourceList from './SourceList';

const KaliApp = () => {
    return (
        <div className='workspace'>
            <SourceList />
            <ActivityList title='Backlog' />
            <ActivityList title='Available' />
            <ActivityList title='Doing' />
            <ActivityList title='Done' />
        </div >
    )
}

export default KaliApp