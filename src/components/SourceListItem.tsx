import React, { useState, useContext } from "react"
import { store } from '../store/store'
import type { Activity, Source } from '../types/types'
import { Modal } from 'react-responsive-modal';
import ActivityForm from "./ActivityForm";

interface Props {
  source: Source
}

const SourceListItem = ({ source }: Props) => {
  const { state } = useContext(store)
  const [open, setOpen] = useState(false)

  const sourceActivities = state.activities.filter((activity: Activity) => activity.sourceID === source.id)
  const numCompleted = sourceActivities.filter((activity: Activity) => activity.status === 'Done').length

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpen(false)
  }

  return (
    <div>
      <p>{source.name}</p>
      <button onClick={() => setOpen(true)}>Add activity</button>
      <p>{numCompleted}/{sourceActivities.length}</p>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ActivityForm source={source} onSubmit={onSubmit} />
      </Modal>
    </div>
  )
}

export default SourceListItem