export type Action = {
    type: string
    payload: any
}

export interface Source {
    id: string
    name: string
}

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

export interface AppState {
    tags: string[]
    sources: Source[]
    activities: Activity[]

}

export type AppReducer = (state: AppState, action: Action) => AppState
