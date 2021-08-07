import React, { createContext, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid'

export interface Activity {
    id: string
    title: string
    description: string
    startDate: string | undefined
    endDate: string | undefined
    dueDate: string | undefined
    sourceID: string
    status: string
}

export interface Source {
    id: string
    name: string
    activities: string[]
}

export interface AppState {
    tags: string[]
    sources: Source[]
    activities: Activity[]

}

type StoreContextType = {
    state: AppState
    dispatch: React.Dispatch<any>
}

const srcId1 = uuidv4()
const srcId2 = uuidv4()
const actId1 = uuidv4()
const actId2 = uuidv4()
const actId3 = uuidv4()


const initialState: AppState = {
    tags: [],
    sources: [
        {
            id: srcId1,
            name: 'Kali App',
            activities: [
                actId2, actId3
            ]
        },
        {
            id: srcId2,
            name: 'Physics',
            activities: [
                actId1,
            ]
        }
    ],
    activities: [
        {
            id: actId1,
            title: 'Learn about blackholes',
            description: 'where do they put stuff?',
            startDate: undefined,
            endDate: undefined,
            dueDate: undefined,
            sourceID: srcId2,
            status: 'Backlog',
        },
        {
            id: actId2,
            title: 'Learn React enough to do this',
            description: 'The Complete React Developer Course',
            startDate: 'Aug 1st',
            endDate: 'Aug 6th',
            dueDate: undefined,
            sourceID: srcId1,
            status: 'Done',
        },
        {
            id: actId3,
            title: 'Develop Kali',
            description: 'basically Trello 2',
            startDate: 'Aug 6th',
            endDate: undefined,
            dueDate: 'Aug 31st',
            sourceID: srcId1,
            status: 'Doing',
        },
    ]
}

const store = createContext<StoreContextType | null>(null)

const { Provider } = store

const StoreProvider: React.FC = ({ children }) => {
    const findActivity = (activity: Activity, id: string) => {
        return activity.id === id
    }

    const [state, dispatch] = useReducer((state: AppState, action: any) => {
        switch (action.type) {
            case 'ADD_ACTIVITY':
                return {
                    ...state,
                    activities: [...state.activities, action.activity]
                }
            case 'UPDATE_ACTIVITY':
                const item = state.activities.filter(activity => action.activity.id === activity.id)

                return {
                    ...state,
                    activities: [...state.activities.filter(activity => action.activity.id !== activity.id),
                    {
                        ...item,
                        ...action.activity
                    }]
                }
            default:
                return state
        }
    }, initialState)

    return <Provider value={{ state, dispatch }}> {children}</Provider >
}

export { store, StoreProvider }