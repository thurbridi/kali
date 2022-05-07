import React, { useRef, useState } from 'react'
import { Activity, ActivityStatus, DragTypes } from '../types/types'
import Modal from 'react-modal';
import ActivityForm from './ActivityForm'
import { connect, ConnectedProps } from 'react-redux';
import { activityEdited, activityEditedAsync, activityMoved, activityMovedAsync, activityRemovedAsync } from '../actions/activities';
import { AppDispatch, AppState } from '../store/store';
import { useDrag, useDrop } from 'react-dnd';


interface Props extends PropsFromRedux {
    activity: Activity
    showStatus?: boolean
    showDetails?: boolean
    index: number
}

interface DropResult {
    id?: Activity['id']
    toStatus: string,
    toIdx: number
}

const ActivityListItem = (props: Props) => {
    const { activity, showStatus, showDetails } = props
    const [openActivity, setOpenActivity] = useState(false)

    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag({
        type: DragTypes.Activity,
        item: {
            id: activity.id,
            fromStatus: activity.statusId,
            fromIdx: props.index
        },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                const { id, fromStatus, fromIdx } = item
                const { toStatus, toIdx } = monitor.getDropResult() as DropResult

                if (fromStatus === toStatus && fromIdx === toIdx) {
                    return
                }

                console.log(`moving ${id} from ${fromStatus}:${fromIdx} to ${toStatus}:${toIdx}`)
                props.activityMoved(id, fromStatus, toStatus, fromIdx, toIdx)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const [{ handlerId }, drop] = useDrop({
        accept: DragTypes.Activity,
        drop: (item, monitor) => ({
            id: activity.id,
            toStatus: activity.statusId,
            toIdx: props.index
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
                {(activity.description && showDetails) && <p>{activity.description}</p>}
                {showStatus && <p>{activity.statusId}</p>}
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
    activityRemovedAsync: (id: string, statusId: string) => dispatch(activityRemovedAsync(id, statusId)),
    activityEditedAsync: (activity: Partial<Activity>) => dispatch(activityEditedAsync(activity)),
    activityEdited: (activity: Partial<Activity>) => { console.log('activityEdited'); dispatch(activityEdited(activity)) },
    activityMoved: (id: Activity['id'], fromStatus: string, toStatus: string, fromIdx: number, toIdx: number) => dispatch(activityMovedAsync(id, fromStatus, toStatus, fromIdx, toIdx))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityListItem)