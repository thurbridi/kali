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
        default:
            return state
    }
}

export default activitiesReducer