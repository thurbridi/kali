import { Action, Activity, ActivityStatus } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

import { AppDispatch } from "../store/store";

export const activityAdded = (activity: Activity): Action => ({
    type: 'activities/activityAdded',
    payload: activity
})

export const activityAddedAsync = (activityData: Partial<Activity> = {}) => {
    // Activity defaults
    const activity: Activity = {
        id: uuidv4(),
        title: '',
        description: '',
        startDate: undefined,
        endDate: undefined,
        dueDate: undefined,
        sourceId: undefined,
        status: ActivityStatus.Backlog,
        rank: undefined,
        isArchived: false,
        tags: undefined,
        ...activityData
    }
    return (dispatch: AppDispatch) => {
        return window.storageAPI.storeKey(`state.activities.${activity.id}`, activity)
            .then(() => dispatch(activityAdded(activity)))
    }
}

export const activityEdited = (activity: Activity) => ({
    type: 'activities/activityEdited',
    payload: activity
})

export const activityEditedAsync = (activity: Activity) => {
    return (dispatch: AppDispatch) => {
        return window.storageAPI.storeKey(`state.activities.${activity.id}`, activity)
            .then(() => dispatch(activityAdded(activity)))
    }
}

export const activityRemoved = (id: string) => ({
    type: 'activities/activityRemoved',
    payload: id
})

export const activityRemovedAsync = (id: string) => {
    return async (dispatch: AppDispatch) => {
        return window.storageAPI.deleteKey(`state.activities.${id}`)
            .then(() => dispatch(activityRemoved(id)))
    }
}

const activitiesFetched = (activities: { [id: string]: Activity }) => ({
    type: 'activities/activitiesFetched',
    payload: activities
})

export const activitiesFetchedAsync = () => {
    return async (dispatch: AppDispatch) => {
        return window.storageAPI.loadKey('state.activities')
            .then((activities) => dispatch(activitiesFetched(activities)))
    }
}