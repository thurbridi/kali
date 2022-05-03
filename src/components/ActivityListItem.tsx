import React, { useState } from 'react'
import { Activity, ActivityStatus } from '../types/types'
import Modal from 'react-modal';
import ActivityForm from './ActivityForm'
import { connect, ConnectedProps } from 'react-redux';
import { activityEditedAsync, activityRemovedAsync } from '../actions/activities';
import { AppDispatch } from '../store/store';



interface Props extends PropsFromRedux {
    activity: Activity,
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
                onClick={() => props.activityRemovedAsync(activity.id)}
            >
                Remove
            </button>
            <button
                onClick={() => {
                    props.activityEditedAsync({ ...activity, status: ActivityStatus.Backlog })
                }}
            >
                Backlog
            </button>
            <button
                onClick={() => {
                    props.activityEditedAsync({ ...activity, status: ActivityStatus.Available })
                }}
            >
                Available
            </button>
            <button
                onClick={() => {
                    props.activityEditedAsync({ ...activity, status: ActivityStatus.InProgress })
                }}
            >
                In progress
            </button>
            <button
                onClick={() => {
                    props.activityEditedAsync({ ...activity, status: ActivityStatus.Done })
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

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    activityRemovedAsync: (id: string) => dispatch(activityRemovedAsync(id)),
    activityEditedAsync: (activity: Activity) => dispatch(activityEditedAsync(activity))
})

const connector = connect(undefined, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityListItem)