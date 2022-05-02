import React, { useState } from "react"
import type { Activity, Source } from '../types/types'
import { connect } from "react-redux"
import { activityAdded, activityEdited } from "../actions/activities"
import { RootState } from "../store/store"


interface Props {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    source?: Source
    activity?: Activity
    dispatch: any
}

const ActivityForm = (props: Props) => {
    const activity = props.activity
    const source = props.source

    const [title, setTitle] = useState(activity ? activity.title : '')
    const [description, setDescription] = useState(activity ? activity.description : '')

    const action = activity ? activityEdited({ ...activity, title, description }) : activityAdded(title, description, source.id)

    const onTitleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }

    const onDescriptionChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    return (
        <form
            className='form'
            onSubmit={(event) => {
                props.dispatch(action)
                props.onSubmit(event)
            }}
        >
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={onTitleChange}
            />
            <textarea
                placeholder='Description'
                value={description}
                onChange={onDescriptionChange}
            />
            <button>{activity ? 'Save' : 'Add activity'}</button>
        </form>
    )
}

const mapStateToProps = (state: RootState) => {
    return {}
}

export default connect(mapStateToProps)(ActivityForm)