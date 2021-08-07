import React, { useContext } from 'react'
import { Activity } from '../types/types'
import { store } from '../store/store'


interface Props {
  activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {
  const { dispatch } = useContext(store)

  return (
    <div>
      <h4>{activity.title}</h4>
      {activity.description && <p>{activity.description}</p>}
      {activity.dueDate && <p>Due: {activity.dueDate}</p>}
      <button
        onClick={() => dispatch({ type: 'REMOVE_ACTIVITY', payload: { id: activity.id } })}
      >
        Remove
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'backlog' } } })
        }}
      >
        Backlog
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'available' } } })
        }}
      >
        Available
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'doing' } } })
        }}
      >
        Doing
      </button>
      <button
        onClick={() => {
          dispatch({ type: 'UPDATE_ACTIVITY', payload: { activity: { ...activity, status: 'done' } } })
        }}
      >
        Done
      </button>
    </div>
  )

}

export default ActivityListItem