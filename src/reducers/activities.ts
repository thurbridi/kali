import type { Activity, Action } from '../types/types'


const activitiesReducer = (state: Activity[], action: Action): Activity[] => {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return [
        ...state,
        action.payload.activity
      ]
    case 'UPDATE_ACTIVITY':
      return [
        ...state.filter(activity => action.payload.activity.id !== activity.id),
        action.payload.activity
      ]
    case 'REMOVE_ACTIVITY':
      return [
        ...state.filter(activity => action.payload.id !== activity.id)
      ]
    case 'REMOVE_ALL_FROM_SOURCE':
      return [
        ...state.filter(activity => action.payload.id !== activity.sourceID)
      ]
    case 'LOAD_LOCAL_DATA':
      return action.payload.activities
    default:
      return state
  }
}

export default activitiesReducer