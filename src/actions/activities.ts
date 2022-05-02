import { Action, Activity } from "../types/types";
import { v4 as uuidv4 } from 'uuid';

import { AppDispatch } from "../store/store";

export const activityAdded = (title: string, description: string, sourceId: string): Action => ({
    type: 'activities/activityAdded',
    payload: {
        id: uuidv4(),
        title,
        description,
        startDate: undefined,
        endDate: undefined,
        dueDate: undefined,
        sourceId,
        status: 'Backlog',
    }
})

export const activityEdited = (activity: Activity) => ({
    type: 'activities/activityEdited',
    payload: {
        ...activity
    }
})

export const activityRemoved = (id: string) => ({
    type: 'activities/activityRemoved',
    payload: id
})

const activitiesFetched = (activities: { [id: string]: Activity }) => ({
    type: 'activities/activitiesFetched',
    payload: activities
})

export const activitiesFetchedAsync = () => (dispatch: AppDispatch) => {
    return window.storageAPI.loadKey('state.activities').then((activities) => {
        dispatch(activitiesFetched(activities))
    })
}