import type { Action, Source } from "../types/types"

interface Slice {
    [id: string]: Source
}

export const sourcesReducer = (state: Slice = {}, action: Action): Slice => {
    switch (action.type) {
        case 'root/stateFetched': {
            return action.payload.sources
        }

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
            const { sourceId } = action.payload
            const newState = { ...state }
            delete newState[sourceId]
            return newState
        }

        case 'sources/sourcesFetched': {
            const sources: { [id: string]: Source } = action.payload
            return sources
        }
        default: return state
    }
}