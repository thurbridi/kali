import React, { useState, useContext } from "react"
import type { Activity, Source } from '../types/types'
import { store } from '../store/store'
import { v4 as uuidv4 } from 'uuid'


interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  source?: Source
  activity?: Activity
}

const ActivityForm = ({ onSubmit, source, activity }: Props) => {
  const { dispatch } = useContext(store)

  const [activityTitle, setActivityTitle] = useState(activity ? activity.title : '')
  const [activityDesc, setActivityDesc] = useState(activity ? activity.description : '')

  const addActivity = (event: React.FormEvent<HTMLFormElement>) => {
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        activity: {
          id: uuidv4(),
          title: activityTitle,
          description: activityDesc,
          startDate: undefined,
          endDate: undefined,
          dueDate: undefined,
          sourceID: source.id,
          status: 'Backlog',
        }
      }
    })
    setActivityTitle('')
    setActivityDesc('')
    onSubmit(event)
  }

  const updateActivity = (event: React.FormEvent<HTMLFormElement>) => {
    dispatch({
      type: 'UPDATE_ACTIVITY',
      payload: {
        activity: {
          ...activity,
          title: activityTitle,
          description: activityDesc,
        }
      }
    })
    onSubmit(event)
  }

  return (
    <form className='form' onSubmit={(event) => activity ? updateActivity(event) : addActivity(event)}>
      <input type='text' placeholder='Title' value={activityTitle} onChange={(event) => setActivityTitle(event.target.value)} />
      <textarea placeholder='Description' value={activityDesc} onChange={(event) => setActivityDesc(event.target.value)} />
      <button>{activity ? 'Save' : 'Add activity'}</button>
    </form>
  )
}

export default ActivityForm