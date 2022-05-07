import React, { useRef, useState } from 'react'
import { Activity, ActivityStatus, DragDropTypes } from '../types/types'
import Modal from 'react-modal';
import ActivityForm from './ActivityForm'
import { connect, ConnectedProps } from 'react-redux';
import { activityEdited, activityEditedAsync, activityRemovedAsync } from '../actions/activities';
import { AppDispatch, AppState } from '../store/store';
import { useDrag, useDrop } from 'react-dnd';


interface Props extends PropsFromRedux {
    activity: Activity,
    hideDetails?: boolean,
    rank: number
}

const ActivityListItem = (props: Props) => {
    const { activity, hideDetails = false } = props
    const [openActivity, setOpenActivity] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag({
        type: DragDropTypes.Activity,
        item: {
            id: activity.id,
            rank: props.rank,
            status: activity.status,
        },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                const dropResult = monitor.getDropResult<{ id: string, rank: number, status: ActivityStatus }>()
                if (dropResult.status !== item.status) {
                    props.activityEditedAsync({ id: activity.id, status: dropResult.status })
                } else {
                    if (dropResult.id) {
                        if (dropResult.id === item.id) {
                            return
                        }

                        console.log(item)
                        console.log(dropResult)

                        props.activityEditedAsync({ id: dropResult.id, rank: item.rank })
                        props.activityEditedAsync({ id: item.id, rank: dropResult.rank })
                    }
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [{ handlerId }, drop] = useDrop({
        accept: DragDropTypes.Activity,
        drop: (item, monitor) => ({
            id: activity.id,
            rank: props.rank,
            status: activity.status,
        }),
        hover: (item, monitor) => {
        },
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        })
    })


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpenActivity(false)
    }

    drag(drop(ref))
    return (
        <div ref={ref} data-handler-ir={handlerId} style={{ opacity: isDragging ? 0.5 : 1 }} className='activityList__item'>
            <div onClick={(event) => { event.stopPropagation(); setOpenActivity(true) }}>
                <div className='activity-card__source-color' style={{ background: props.sourceColor }} />
                <p className='title'>{activity.title}</p>
                {(activity.description && !hideDetails) && <p>{activity.description}</p>}
                {<p>rankProp: {props.rank}</p>}
                {<p>rank: {activity.rank}</p>}
                {activity.dueDate && <p>Due: {activity.dueDate}</p>}
            </div>
            <Modal isOpen={openActivity} onRequestClose={() => setOpenActivity(false)}>
                <ActivityForm onSubmit={onSubmit} activity={activity} />
            </Modal>
        </div >
    )

}

// FIXME: ownProps: any = bad
const mapStateToProps = (state: AppState, ownProps: any) => ({
    sourceColor: state.sources[ownProps.activity.sourceId].color
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    activityRemovedAsync: (id: string) => dispatch(activityRemovedAsync(id)),
    activityEditedAsync: (activity: Partial<Activity>) => dispatch(activityEditedAsync(activity)),
    activityEdited: (activity: Partial<Activity>) => dispatch(activityEdited(activity)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityListItem)