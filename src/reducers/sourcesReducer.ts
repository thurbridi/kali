import type { Action, Source } from "../types/types"


export const sourcesReducer = (state: { [id: string]: Source } = {}, action: Action) => {
    switch (action.type) {
        case 'sources/sourceAdded': {
            const source: Source = action.payload

            return {
                ...state,
                [source.id]: source
            }
        }
        // sourceEdited is semantically different from sourceAdded
        case 'sources/sourceEdited': {
            const source: Source = action.payload

            return {
                ...state,
                [source.id]: source
            }
        }
        case 'sources/sourceRemoved': {
            const newState = { ...state }

            delete newState[action.payload]
            return newState
        }
        case 'sources/sourcesFetched': {
            const sources: { [id: string]: Source } = action.payload
            return sources
        }
        default: return state
    }
}