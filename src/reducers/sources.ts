import type { Source, Action } from '../types/types'

const sourcesReducer = (state: Source[], action: Action): Source[] => {
  switch (action.type) {
    case 'ADD_SOURCE':
      return [...state, action.payload.source]
    case 'UPDATE_SOURCE':
      return [
        ...state.filter(source => source.id !== action.payload.source.id),
        action.payload.source
      ]
    case 'REMOVE_SOURCE':
      return [...state.filter(source => source.id !== action.payload.id)]
    case 'LOAD_LOCAL_DATA':
      return action.payload.sources
    default:
      return state
  }
}

export default sourcesReducer