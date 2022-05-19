import React, { useRef, useState } from 'react'
import { Activity, DragTypes } from '../types/types'
import Modal from 'react-modal';
import ActivityDetails from './ActivityDetails'
import { connect, ConnectedProps } from 'react-redux';
import { activityEdited, activityEditedAsync, activityMovedAsync, activityRemovedAsync } from '../actions/activities';
import { AppDispatch, AppState } from '../store/store';
import { useDrag, useDrop } from 'react-dnd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

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
        <div ref={ref} data-handler-ir={handlerId} style={{ opacity: isDragging ? 0.5 : 1 }} className='activity-card'>
            <div onClick={(event) => { event.stopPropagation(); setOpenActivity(true) }} >
                <div className='activity-card__source-color' style={{ background: props.sourceColor }} />
                <p className='title'>{activity.title}</p>
                <div className='activity-card__description'>
                    {(activity.description && showDetails) && <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{activity.description}</ReactMarkdown>}
                </div>
                {showStatus && <p>{activity.statusId}</p>}
                {showStatus && activity.isArchived && <p>ARCHIVED</p>}
                {activity.dueDate && <p>Due: {activity.dueDate}</p>}
            </div>
            <Modal isOpen={openActivity} onRequestClose={() => setOpenActivity(false)}>
                <ActivityDetails onSubmit={onSubmit} activity={activity} />
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