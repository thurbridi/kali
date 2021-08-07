import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Source, Activity, store, StoreProvider } from '../store/store'




const ActivityList = (props: any) => {
  const { state } = useContext(store)
  const activities = state.activities

  return (
    <div>
      <h2>{props.title}</h2>
      {
        activities.filter(
          activity => activity.status === props.title
        ).map(activity => <ActivityListItem key={activity.id} activity={activity} />)
      }
    </div>
  )
}

const ActivityListItem = ({ activity }: any) => {
  const { dispatch } = useContext(store)

  return (
    <div>
      <h4>{activity.title}</h4>
      {activity.description && <p>{activity.description}</p>}
      {activity.dueDate && <p>Due: {activity.dueDate}</p>}
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', activity: { ...activity, status: 'Backlog' } })
        }}
      >
        Backlog
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', activity: { ...activity, status: 'Available' } })
        }}
      >
        Available
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', activity: { ...activity, status: 'Doing' } })
        }}
      >
        Doing
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', activity: { ...activity, status: 'Done' } })
        }}
      >
        Done
      </button>
    </div>
  )

}



const SourcesList = () => {
  const { state } = useContext(store)

  return (
    <div>
      <h3>Sources:</h3>
      {state.sources.map(source => <SourceListItem key={source.id} source={source} />)}
    </div>
  )
}

const SourceListItem = ({ source }: any) => {
  const { state, dispatch } = useContext(store)

  const sourceActivities = state.activities.filter(activity => activity.sourceID === source.id)
  const numCompleted = sourceActivities.filter(
    (activity) => activity.status === 'Done').length

  const onAddActivity = (sourceID: string) => {
    dispatch({
      type: 'ADD_ACTIVITY', activity: {
        id: uuidv4(),
        title: 'Learn about blackholes',
        description: 'where do they put stuff?',
        startDate: undefined,
        endDate: undefined,
        dueDate: undefined,
        sourceID: sourceID,
        status: 'Backlog',
      }
    })
  }

  return (
    <div>
      <p>{source.name}</p>
      <button onClick={() => onAddActivity(source.id)}>Add activity</button>
      <p>{numCompleted}/{sourceActivities.length}</p>
    </div>
  )
}

const KaliApp = () => {
  return (
    <StoreProvider>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SourcesList />
        <ActivityList title='Backlog' />
        <ActivityList title='Available' />
        <ActivityList title='Doing' />
        <ActivityList title='Done' />
      </div >
    </StoreProvider>
  )
}

export default KaliApp