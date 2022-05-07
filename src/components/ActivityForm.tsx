import React, { useState } from "react"
import { Activity, Source } from '../types/types'
import { connect, ConnectedProps } from "react-redux"
import { activityAddedAsync, activityEditedAsync, activityRemovedAsync } from "../actions/activities"
import { AppDispatch, AppState } from "../store/store"


interface Props extends PropsFromRedux {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    source?: Source
    activity?: Activity
}

const ActivityForm = (props: Props) => {
    const activity = props.activity
    const source = props.source

    const [title, setTitle] = useState(activity ? activity.title : '')
    const [description, setDescription] = useState(activity ? activity.description : '')


    const onTitleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }

    const onDescriptionChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <form
                onSubmit={(event) => {
                    activity ?
                        props.activityEditedAsync({ ...activity, title, description })
                        : props.activityAddedAsync({
                            title,
                            description,
                            sourceId: source.id,
                            statusId: props.initalStatus
                        })
                    props.onSubmit(event)
                }}
            >
                <input
                    className="title"
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={onTitleChange}
                />
                <textarea
                    className="detail"
                    placeholder='Description'
                    value={description}
                    onChange={onDescriptionChange}
                />
                <button>{activity ? 'Save' : 'Add activity'}</button>
            </form>
            {activity ?
                <div style={{ alignSelf: "center" }}>
                    <button className="button--cautious"
                        onClick={() => props.activityRemovedAsync(activity.id, activity.statusId)}
                    >
                        Remove Activity
                    </button>
                </div> : null}
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    initalStatus: Object.values(state.statusLists).filter((list) => list.isInitial)[0].status
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    activityRemovedAsync: (id: string, statusId: string) => dispatch(activityRemovedAsync(id, statusId)),
    activityAddedAsync: (activityData: Partial<Activity>) => dispatch(activityAddedAsync(activityData)),
    activityEditedAsync: (activity: Activity) => dispatch(activityEditedAsync(activity))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityForm)