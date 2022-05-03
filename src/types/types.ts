export interface Action {
    type: string
    payload: any
}

export interface Source {
    id: string
    title: string
    description: string
}

export enum ActivityStatus {
    Backlog = "BACKLOG",
    Available = "AVAILABLE",
    InProgress = "IN PROGRESS",
    Done = "DONE",
}

export interface Activity {
    id: string
    title: string
    description: string
    tags: string[]
    startDate: string | undefined
    endDate: string | undefined
    dueDate: string | undefined
    sourceId: string
    status: ActivityStatus
    isArchived: boolean
    rank: number
}