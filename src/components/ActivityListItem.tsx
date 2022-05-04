import React, { useState } from 'react'
import { Activity, ActivityStatus, DropTypes } from '../types/types'
import Modal from 'react-modal';
import ActivityForm from './ActivityForm'
import { connect, ConnectedProps } from 'react-redux';
import { activityEditedAsync, activityRemovedAsync } from '../actions/activities';
import { AppDispatch } from '../store/store';
import { useDrag } from 'react-dnd';



interface Props extends PropsFromRedux {
    activity: Activity,
}

interface DropResult {
    allowedDropEffect: string
    dropEffect: string
}

interface ActivityDropResult extends DropResult {
    droppedIn: ActivityStatus
}

const ActivityListItem = (props: Props) => {

    const [openActivity, setOpenActivity] = useState(false)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DropTypes.Activity,
        item: { id: props.activity.id },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                const {
                    droppedIn
                } = monitor.getDropResult() as ActivityDropResult

                props.activityEditedAsync({
                    ...activity,
                    status: droppedIn
                })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }),
        [props.activity.id]
    )


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpenActivity(false)
    }

    const activity = props.activity

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className='activityList__item'>
            <div onClick={(event) => { event.stopPropagation(); setOpenActivity(true) }}>
                <h4>{activity.title}</h4>
                {activity.description && <p>{activity.description}</p>}
                {activity.dueDate && <p>Due: {activity.dueDate}</p>}
            </div>
            <div>
                <button
                    onClick={() => props.activityRemovedAsync(activity.id)}
                >
                    Remove
                </button>
            </div>
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