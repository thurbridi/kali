import React, { useContext, useState } from "react"
import { store } from '../store/store'
import SourceListItem from './SourceListItem'

import type { Source } from '../types/types'
import Modal from "react-responsive-modal"
import SourceForm from "./SourceForm"

const SourceList = () => {
  const { state } = useContext(store)

  const [open, setOpen] = useState(false)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setOpen(false)
  }

  return (
    <div>
      <h3>Sources</h3>
      <button onClick={() => setOpen(true)}>Add Source</button>
      {state.sources.map((source: Source) => <SourceListItem key={source.id} source={source} />)}
      <Modal open={open} onClose={() => setOpen(false)}>
        <SourceForm onSubmit={onSubmit} />
      </Modal>
    </div>
  )
}

export default SourceList