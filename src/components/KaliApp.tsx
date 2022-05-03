import React from 'react'
import { ActivityStatus } from '../types/types';
import ActivityList from './ActivityList';
import SourceList from './SourceList';

const KaliApp = () => {
    return (
        <div className='workspace'>
            <SourceList />
            <ActivityList title='Backlog' activityStatus={ActivityStatus.Backlog} />
            <ActivityList title='Available' activityStatus={ActivityStatus.Available} />
            <ActivityList title='In progress' activityStatus={ActivityStatus.InProgress} />
            <ActivityList title='Done' activityStatus={ActivityStatus.Done} />
        </div >
    )
}

export default KaliApp