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
            const activityData: Partial<Activity> = action.payload
            return {
                ...state,
                [activityData.id]: { ...state[activityData.id], ...activityData }
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

        case 'sources/sourceRemoved': {
            const sourceId = action.payload
            const newState = { ...state }
            for (const key of Object.keys(newState)) {
                if (newState[key].sourceId === sourceId) {
                    delete newState[key]
                }
            }
            return newState
        }
        default: return state
    }
}