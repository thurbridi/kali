import React, { useState, useContext } from 'react';
import { store } from '../store/store'
import { v4 as uuidv4 } from 'uuid'
import type { Source } from '../types/types';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  sourceItem?: Source
}

const SourceForm = ({ onSubmit, sourceItem }: Props) => {
  const { dispatch } = useContext(store)
  const [name, setName] = useState(sourceItem ? sourceItem.name : '')
  const [description, setDescription] = useState(sourceItem ? sourceItem.description : '')

  const addSource = (event: React.FormEvent<HTMLFormElement>) => {
    dispatch({
      type: 'ADD_SOURCE',
      payload: {
        source: {
          id: uuidv4(),
          name,
          description
        }
      }
    })
    onSubmit(event)
  }

  const editSource = (event: React.FormEvent<HTMLFormElement>) => {
    dispatch({
      type: 'UPDATE_SOURCE',
      payload: {
        source: {
          ...sourceItem,
          name,
          description
        }
      }
    })
    onSubmit(event)
  }

  return (
    <form className='form' onSubmit={sourceItem ? editSource : addSource}>
      <input
        type='text'
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder='Source title'
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder='Description'
      />
      <button>{sourceItem ? 'Save' : 'Add'}</button>
    </form>
  )
}

export default SourceForm