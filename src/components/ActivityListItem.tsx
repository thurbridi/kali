import React, { useContext } from 'react'
import { store } from '../store/store'


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

export default ActivityListItem