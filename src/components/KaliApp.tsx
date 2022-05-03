import React from 'react'
import { ActivityStatus } from '../types/types';
import ActivityList from './ActivityList';
import SourceList from './SourceList';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const KaliApp = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='workspace'>
                <SourceList />
                <ActivityList title='Backlog' activityStatus={ActivityStatus.Backlog} />
                <ActivityList title='Available' activityStatus={ActivityStatus.Available} />
                <ActivityList title='In progress' activityStatus={ActivityStatus.InProgress} />
                <ActivityList title='Done' activityStatus={ActivityStatus.Done} />
            </div >
        </DndProvider>
    )
}

export default KaliApp