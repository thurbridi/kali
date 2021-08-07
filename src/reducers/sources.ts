import type { Source, Action } from '../types/types'

const sourcesReducer = (state: Source[], action: Action): Source[] => {
  switch (action.type) {
    case 'ADD_SOURCE':
      return { ...state }
    case 'UPDATE_SOURCE':
      return { ...state }
    case 'REMOVE_SOURCE':
      return { ...state }
    default:
      return state
  }
}

export default sourcesReducer