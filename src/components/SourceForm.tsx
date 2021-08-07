import React, { useState, useContext } from 'react';
import { store } from '../store/store'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const SourceForm = ({ onSubmit }: Props) => {
  const { dispatch } = useContext(store)
  const [title, setTitle] = useState('')

  const onAddSource = (event: React.FormEvent<HTMLFormElement>) => {
    dispatch({
      type: 'ADD_SOURCE',
      payload: {
        source: {
          id: uuidv4(),
          name: title
        }
      }
    })
    onSubmit(event)
  }

  return (
    <form onSubmit={onAddSource}>
      <input type='text' value={title} onChange={(event) => setTitle(event.target.value)}></input>
      <button>Add</button>
    </form>
  )
}

export default SourceForm