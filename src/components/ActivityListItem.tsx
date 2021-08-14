import React, { useContext, useState } from 'react'
import type { Activity } from '../types/types'
import { store } from '../store/store'
import Modal from 'react-modal';
import ActivityForm from './ActivityForm'



interface Props {
  activity: Activity
}

const ActivityListItem = ({ activity }: Props) => {
  const { dispatch } = useContext(store)
  const [openActivity, setOpenActivity] = useState(false)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpenActivity(false)
  }

  return (
    <div className='activityList__item' onClick={() => setOpenActivity(true)}>
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
      <Modal isOpen={openActivity} onRequestClose={() => setOpenActivity(false)}>
        <ActivityForm onSubmit={onSubmit} activity={activity} />
      </Modal>
    </div>
  )

}

export default ActivityListItem