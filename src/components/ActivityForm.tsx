import React, { useState, useContext } from "react"
import { Source, Activity } from '../types/types'
import { store } from '../store/store'
import { v4 as uuidv4 } from 'uuid'


interface Props {
  source: Source
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const ActivityForm = ({ source, onSubmit }: Props) => {
  const { dispatch } = useContext(store)

  const [activityTitle, setActivityTitle] = useState('')
  const [activityDesc, setActivityDesc] = useState('')

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
    <form onSubmit={(event) => {
      onAddActivity(createActivity(activityTitle, activityDesc))
      setActivityTitle('')
      setActivityDesc('')
      onSubmit(event)
    }}>
      <h3>New activity for {source.name}</h3>
      <input type='text' placeholder='Title' value={activityTitle} onChange={(event) => setActivityTitle(event.target.value)} />
      <textarea placeholder='Description' value={activityDesc} onChange={(event) => setActivityDesc(event.target.value)} />
      <button>Add activity</button>
    </form>
  )
}

export default ActivityForm