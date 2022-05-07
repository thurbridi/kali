export interface Action {
    type: string
    payload: any
}

export interface Source {
    id: string
    title: string
    description: string
    color: HEX
}

export interface StatusList {
    status: string
    isInitial: boolean
    isTerminal: boolean
    activityIds: Activity['id'][]
}

export interface Tag {
    id: string
    name: string
    color: HEX
}

export enum ActivityStatus {
    Backlog = "BACKLOG",
    Available = "AVAILABLE",
    InProgress = "IN PROGRESS",
    Done = "DONE",
}


export enum DragTypes {
    Activity = "ACTIVITY"
}

export interface Activity {
    id: string
    title: string
    description: string
    tagIds: Tag['id'][]
    startDate: string | undefined
    endDate: string | undefined
    dueDate: string | undefined
    sourceId: string
    statusId: string
    isArchived: boolean
}

export type HEX = `#${string}`

export type Color = HEX