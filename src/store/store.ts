import { activitiesReducer } from '../reducers/activitiesReducer';
import { sourcesReducer } from '../reducers/sourcesReducer';
import { tagsReducer } from '../reducers/tagsReducer';
import { configureStore } from '@reduxjs/toolkit';
import { statusListsReducer } from '../reducers/statusListsReducer';

export const store = configureStore({
    devTools: true,
    reducer: {
        tags: tagsReducer,
        sources: sourcesReducer,
        activities: activitiesReducer,
        statusLists: statusListsReducer,
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch