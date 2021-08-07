import React, { useState, useContext } from "react"
import { store } from '../store/store'
import { v4 as uuidv4 } from 'uuid'
import type { Activity } from '../types/types'
import { Modal } from 'react-responsive-modal';


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

export default SourceListItem