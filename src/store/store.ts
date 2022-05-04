import { activitiesReducer } from '../reducers/activitiesReducer';
import { sourcesReducer } from '../reducers/sourcesReducer';
import { tagsReducer } from '../reducers/tagsReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    devTools: true,
    reducer: {
        tags: tagsReducer,
        sources: sourcesReducer,
        activities: activitiesReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch