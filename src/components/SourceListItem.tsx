import React, { useState, useContext } from "react"
import { store } from '../store/store'
import type { Activity, Source } from '../types/types'
import Modal from 'react-modal';
import ActivityForm from "./ActivityForm";

interface Props {
  source: Source
}

const SourceListItem = ({ source }: Props) => {
  const { state, dispatch } = useContext(store)
  const [open, setOpen] = useState(false)

  const sourceActivities = state.activities.filter((activity: Activity) => activity.sourceID === source.id)
  const numCompleted = sourceActivities.filter((activity: Activity) => activity.status.toLowerCase() === 'done').length

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpen(false)
  }

  return (
    <div>
      <p>{source.name}</p>
      <p>{numCompleted}/{sourceActivities.length} Completed</p>
      <button onClick={() => {
        dispatch({
          type: 'REMOVE_SOURCE',
          payload: {
            id: source.id
          }
        })
        dispatch({
          type: 'REMOVE_ALL_FROM_SOURCE',
          payload: {
            id: source.id
          }
        })
      }}>Remove Source</button>
      <button onClick={() => setOpen(true)}>Add activity</button>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <ActivityForm source={source} onSubmit={onSubmit} />
      </Modal>
    </div>
  )
}

export default SourceListItem