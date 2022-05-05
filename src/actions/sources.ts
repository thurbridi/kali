import { Action, Source } from "../types/types";
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from "../store/store";



export const sourceAdded = (source: Source): Action => ({
    type: 'sources/sourceAdded',
    payload: source
})

export const sourceAddedAsync = (sourceData: Partial<Source> = {}) => {
    return async (dispatch: AppDispatch) => {
        const source: Source = {
            id: uuidv4(),
            title: '',
            description: '',
            color: '#ffffff',
            ...sourceData
        }
        return window.storageAPI.storeKey(`state.sources.${source.id}`, source)
            .then(() => dispatch(sourceAdded(source)))
    }
}

export const sourceEdited = (source: Source): Action => ({
    type: 'sources/sourceEdited',
    payload: {
        ...source
    }
})

export const sourceEditedAsync = (source: Source) => {
    return async (dispatch: AppDispatch) => {
        return window.storageAPI.storeKey(`state.sources.${source.id}`, source)
            .then(() => dispatch(sourceEdited(source)))
    }
}

export const sourceRemoved = (sourceId: string): Action => ({
    type: 'sources/sourceRemoved',
    payload: sourceId
})

// FIXME: I don't like having to mirror the behavior of the reducer in the "database"
export const sourceRemovedAsync = (sourceId: string) => {
    return async (dispatch: AppDispatch) => {
        return window.storageAPI.deleteKey(`state.sources.${sourceId}`)
            .then(() => window.storageAPI.loadKey('state.activities'))
            .then((activities) => {
                for (const key of Object.keys(activities)) {
                    if (activities[key].sourceId === sourceId) {
                        window.storageAPI.deleteKey(`state.activities.${key}`)
                    }
                }
            })
            .then(() => dispatch(sourceRemoved(sourceId)))
    }
}

export const sourcesFetched = (sources: { [id: string]: Source }) => ({
    type: 'sources/sourcesFetched',
    payload: sources
})

export const sourcesFetchedAsync = () => {
    return async (dispatch: AppDispatch) => {
        return window.storageAPI.loadKey('state.sources')
            .then((sources) => dispatch(sourcesFetched(sources)))
    }
}