import { stat } from "original-fs"
import { AppState } from "../store/store"
import type { Action, Activity } from "../types/types"

interface Slice {
    [id: string]: Activity
}

export const activitiesReducer = (state: Slice = {}, action: Action): Slice => {
    switch (action.type) {
        case 'root/stateFetched': {
            return action.payload.activities
        }

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

        case 'activitites/activityMoved': {
            const { id, toStatus } = action.payload
            return {
                ...state,
                [id]: { ...state[id], statusId: toStatus }
            }
        }

        case 'activities/activityRemoved': {
            const { id } = action.payload
            const newState = { ...state }
            delete newState[id]
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