import { Action, Activity, Source } from "../types/types";
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch, AppState } from "../store/store";



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
        await window.storageAPI.storeKey(`state.sources.${source.id}`, source)
            .then(() => dispatch(sourceAdded(source)))
    }
}

export const sourceEdited = (source: Source): Action => ({
    type: 'sources/sourceEdited',
    payload: {
        ...source
    }
})

// FIXME: I don't like having to mirror the behavior of the reducer in the "database"
export const sourceEditedAsync = (source: Source) => {
    return async (dispatch: AppDispatch) => {
        return window.storageAPI.storeKey(`state.sources.${source.id}`, source)
            .then(() => dispatch(sourceEdited(source)))
    }
}

export const sourceRemoved = (sourceId: string, sourceActivitiesIds: Activity['id'][]): Action => ({
    type: 'sources/sourceRemoved',
    payload: {
        sourceId,
        sourceActivitiesIds
    }
})

export const sourceRemovedAsync = (sourceId: string) => {
    return async (dispatch: AppDispatch, getState: () => AppState) => {
        const sourceActivitiesIds = Object.values(getState().activities)
            .filter((activity) => activity.sourceId === sourceId)
            .map((activity) => activity.id)

        dispatch(sourceRemoved(sourceId, sourceActivitiesIds))

        window.storageAPI.storeKey('state', getState())
    }
}