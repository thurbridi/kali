import { Action, Source } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

import { AppDispatch } from "../store/store";



export const sourceAdded = (source: Source): Action => ({
    type: 'sources/sourceAdded',
    payload: source
})

export const sourceAddedAsync = (sourceData: { title?: string, description?: string } = {}) => {
    return (dispatch: AppDispatch) => {
        const {
            title = '',
            description = ''
        } = sourceData

        const source: Source = { id: uuidv4(), title, description }
        return window.storageAPI.storeKey(`state.sources.${source.id}`, source).then(() => { dispatch(sourceAdded(source)) })
    }
}

export const sourceEdited = (source: Source): Action => ({
    type: 'sources/sourceEdited',
    payload: {
        ...source
    }
})

export const sourceEditedAsync = (source: Source) => {
    return (dispatch: AppDispatch) => {
        return window.storageAPI.storeKey(`state.sources.${source.id}`, source).then(() => { dispatch(sourceEdited(source)) })
    }
}

export const sourceRemoved = (sourceId: string): Action => ({
    type: 'sources/sourceRemoved',
    payload: sourceId
})

export const sourceRemovedAsync = (sourceId: string) => {
    return (dispatch: AppDispatch) => {
        return window.storageAPI.deleteKey(`state.sources.${sourceId}`).then(() => {
            dispatch(sourceRemoved(sourceId))
        })
    }
}

const sourcesFetched = (sources: { [id: string]: Source }) => ({
    type: 'sources/sourcesFetched',
    payload: sources
})

export const sourcesFetchedAsync = () => {
    return (dispatch: AppDispatch) => {
        return window.storageAPI.loadKey('state.sources').then((sources) => {
            dispatch(sourcesFetched(sources))
        })
    }
}