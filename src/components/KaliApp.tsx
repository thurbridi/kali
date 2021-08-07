import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { Activity, Source } from '../types/types'

import { store, StoreProvider } from '../store/store'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';



const ActivityList = (props: any) => {
  const { state } = useContext(store)
  const activities = state.activities

  return (
    <div>
      <h2>{props.title}</h2>
      {
        activities.filter(
          (activity: Activity) => activity.status === props.title
        ).map((activity: Activity) => <ActivityListItem key={activity.id} activity={activity} />)
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
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'Backlog' } } })
        }}
      >
        Backlog
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'Available' } } })
        }}
      >
        Available
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'Doing' } } })
        }}
      >
        Doing
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'Done' } } })
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
      <h3>Sources</h3>
      {state.sources.map((source: Source) => <SourceListItem key={source.id} source={source} />)}
    </div>
  )
}

const SourceListItem = ({ source }: any) => {
  const { state, dispatch } = useContext(store)
  const [open, setOpen] = useState(false)
  const [activityTitle, setActivityTitle] = useState('')
  const [activityDesc, setActivityDesc] = useState('')

  const sourceActivities = state.activities.filter((activity: Activity) => activity.sourceID === source.id)
  const numCompleted = sourceActivities.filter((activity: Activity) => activity.status === 'Done').length

  const createActivity = (title: string, description: string): Activity => {
    return {
      id: uuidv4(),
      title,
      description,
      startDate: undefined,
      endDate: undefined,
      dueDate: undefined,
      sourceID: source.id,
      status: 'Backlog',
    }
  }

  const onAddActivity = (activity: Activity) => {
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: { activity }
    })
  }

  return (
    <div>
      <p>{source.name}</p>
      <button onClick={() => setOpen(true)}>Add activity</button>
      <p>{numCompleted}/{sourceActivities.length}</p>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={(event) => {
          event.preventDefault()
          onAddActivity(createActivity(activityTitle, activityDesc))
          setOpen(false)
        }}>
          <h3>New activity for {source.name}</h3>
          <input type='text' placeholder='Title' value={activityTitle} onChange={(event) => setActivityTitle(event.target.value)} />
          <textarea placeholder='Description' value={activityDesc} onChange={(event) => setActivityDesc(event.target.value)} />
          <button>Add activity</button>
        </form>
      </Modal>
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