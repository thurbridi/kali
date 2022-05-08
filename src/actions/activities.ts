import { Action, Activity } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

import { AppDispatch, AppState } from "../store/store";

export const activityAdded = (activityData: Partial<Activity>): Action => {
    const activity: Activity = {
        id: undefined,
        title: '',
        description: '',
        startDate: undefined,
        endDate: undefined,
        dueDate: undefined,
        sourceId: undefined,
        statusId: undefined,
        isArchived: false,
        tagIds: undefined,
        ...activityData
    }

    return {
        type: 'activities/activityAdded',
        payload: activity
    }
}

export const activityAddedAsync = (activityData: Partial<Activity> = {}) => {
    return async (dispatch: AppDispatch, getState: () => AppState) => {
        const id = uuidv4()
        dispatch(activityAdded({ ...activityData, id }))
        const state = getState()
        await window.storageAPI.storeKey('state', state)
    }
}

export const activityEdited = (activity: Partial<Activity>) => ({
    type: 'activities/activityEdited',
    payload: activity
})

export const activityEditedAsync = (activityData: Partial<Activity>) => {
    return async (dispatch: AppDispatch, getState: () => AppState) => {
        dispatch(activityEdited(activityData))
        const activity = getState().activities[activityData.id]
        await window.storageAPI.storeKey(`state.activities.${activity.id}`, activity)
    }
}

export const activityMoved = (id: Activity['id'], fromStatus: string, toStatus: string, fromIdx: number, toIdx: number) => ({
    type: 'activitites/activityMoved',
    payload: {
        id,
        fromStatus,
        toStatus,
        fromIdx,
        toIdx
    }
})

export const activityMovedAsync = (id: Activity['id'], fromStatus: string, toStatus: string, fromIdx: number, toIdx: number) => {
    return async (dispatch: AppDispatch, getState: () => AppState) => {
        dispatch(activityMoved(id, fromStatus, toStatus, fromIdx, toIdx))
        await window.storageAPI.storeKey('state', getState())
    }
}

export const activityRemoved = (id: string, statusId: string) => ({
    type: 'activities/activityRemoved',
    payload: {
        id,
        statusId
    }
})

export const activityRemovedAsync = (id: string, statusId: string) => {
    return async (dispatch: AppDispatch, getState: () => AppState) => {
        dispatch(activityRemoved(id, statusId))
        await window.storageAPI.storeKey('state', getState())
    }
}