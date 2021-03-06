import React from 'react'
import ActivityListItem from './ActivityListItem'
import { Activity, DragTypes } from '../types/types'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { AppState } from '../store/store'


interface Props extends PropsFromRedux {
    title: string
    activityStatus: string
}

const mapStateToProps = (state: AppState, props: any) => ({
    activities: state.statusLists[props.activityStatus].activityIds
        .map((id) => state.activities[id])
})


const ActivityList = (props: Props) => {
    const [{ item }, drop] = useDrop(() => ({
        accept: DragTypes.Activity,
        drop: (item, monitor) => {
            if (monitor.didDrop()) {
                return
            }
            console.log(props.activities.length)
            return {
                toStatus: props.activityStatus,
                toIdx: props.activities.length
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            item: monitor.getItem()
        })
    }), [])


    return (
        <div ref={drop} className='activity-list'>
            <h1 className='activity-list__title'>{props.title}</h1>
            <div className='activity-list__content'>
                {
                    props.activities
                        .filter((activity) => !activity.isArchived)
                        .map((activity: Activity, index: number) =>
                            <ActivityListItem
                                key={activity.id}
                                activity={activity}
                                showDetails={true}
                                index={index}
                            />
                        )
                }
            </div>
        </div>
    )
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityList)