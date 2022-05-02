import React, { useState } from 'react'
import type { Activity } from '../types/types'
import Modal from 'react-modal';
import ActivityForm from './ActivityForm'
import { connect } from 'react-redux';
import { activityEdited, activityRemoved } from '../actions/activities';



interface Props {
    activity: Activity,
    dispatch: any
}

const ActivityListItem = (props: Props) => {

    const [openActivity, setOpenActivity] = useState(false)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpenActivity(false)
    }

    const activity = props.activity

    return (
        <div className='activityList__item'>
            <h4>{activity.title}</h4>
            {activity.description && <p>{activity.description}</p>}
            {activity.dueDate && <p>Due: {activity.dueDate}</p>}
            <button
                onClick={() => setOpenActivity(true)}
            >
                Edit
            </button>
            <button
                onClick={() => props.dispatch(activityRemoved(activity.id))}
            >
                Remove
            </button>
            <button
                onClick={() => {
                    props.dispatch(activityEdited({ ...activity, status: 'backlog' }))
                }}
            >
                Backlog
            </button>
            <button
                onClick={() => {
                    props.dispatch(activityEdited({ ...activity, status: 'available' }))
                }}
            >
                Available
            </button>
            <button
                onClick={() => {
                    props.dispatch(activityEdited({ ...activity, status: 'doing' }))
                }}
            >
                Doing
            </button>
            <button
                onClick={() => {
                    props.dispatch(activityEdited({ ...activity, status: 'done' }))
                }}
            >
                Done
            </button>
            <Modal isOpen={openActivity} onRequestClose={() => setOpenActivity(false)}>
                <ActivityForm onSubmit={onSubmit} activity={activity} />
            </Modal>
        </div>
    )

}

const mapStateToProps = (state: any) => {
    return {}
}

export default connect(mapStateToProps)(ActivityListItem)