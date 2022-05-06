export interface Action {
    type: string
    payload: any
}

export interface Source {
    id: string
    title: string
    description: string
    color: Color
}

export enum ActivityStatus {
    Backlog = "BACKLOG",
    Available = "AVAILABLE",
    InProgress = "IN PROGRESS",
    Done = "DONE",
}

export enum DragDropTypes {
    Activity = "ACTIVITY"
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

export type HEX = `#${string}`

export type Color = HEX