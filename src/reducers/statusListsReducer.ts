import type { Action, StatusList } from "../types/types"

interface Slice {
    [id: string]: StatusList
}

export const statusListsReducer = (state: Slice = {}, action: Action): Slice => {
    switch (action.type) {
        case 'root/stateFetched': {
            return action.payload.statusLists
        }

        case 'activities/activityAdded': {
            const activity = action.payload
            let initialList = Object.values(state).filter((list) => list.isInitial)[0]

            initialList = {
                ...initialList,
                activityIds: [...initialList.activityIds, activity.id]
            }

            return { ...state, [initialList.status]: initialList }
        }

        case 'activities/activityRemoved': {
            const { id, statusId } = action.payload

            const statusList = state[statusId]
            const newIds = statusList.activityIds.filter((activityId) => id !== activityId)
            return {
                ...state,
                [statusList.status]: { ...statusList, activityIds: newIds }
            }
        }

        case 'activitites/activityMoved': {
            const { id, fromStatus, toStatus, fromIdx, toIdx } = action.payload

            const fromIds = Array.from(state[fromStatus].activityIds)

            if (fromStatus === toStatus) {
                fromIds.splice(fromIdx, 1)
                fromIds.splice(toIdx, 0, id)
                return {
                    ...state,
                    [fromStatus]: { ...state[fromStatus], activityIds: fromIds }
                }
            } else {
                const toIds = Array.from(state[toStatus].activityIds)
                fromIds.splice(fromIdx, 1)
                toIds.splice(toIdx, 0, id)
                return {
                    ...state,
                    [fromStatus]: { ...state[fromStatus], activityIds: fromIds },
                    [toStatus]: { ...state[toStatus], activityIds: toIds }
                }
            }
        }

        case 'statusLists/listsSorted': {
            return state
        }


        default: return state
    }
}