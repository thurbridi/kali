import type { Action, Activity } from "../types/types"


export const activitiesReducer = (state: { [id: string]: Activity } = {}, action: Action) => {
    switch (action.type) {
        case 'activities/activityAdded': {
            const activity = action.payload
            return {
                ...state,
                [activity.id]: activity
            }
        }
        // Semantically different from activityAdded
        case 'activities/activityEdited': {
            const activity: Activity = action.payload
            return {
                ...state,
                [activity.id]: activity
            }
        }

        case 'activities/activityRemoved': {
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        }

        case 'activities/activitiesFetched': {
            const activities: { [id: string]: Activity } = action.payload
            return activities
        }
        default: return state
    }
}