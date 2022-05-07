import React, { useContext } from 'react'
import ActivityListItem from './ActivityListItem'
import { Activity, ActivityStatus, DragDropTypes } from '../types/types'
import { connect, ConnectedProps } from 'react-redux'
import { useDrop } from 'react-dnd'
import { AppDispatch } from '../store/store'
import { activityEdited } from '../actions/activities'

interface Props extends PropsFromRedux {
    title: string
    activities: Activity[]
    activityStatus: ActivityStatus
}

const ActivityList = (props: Props) => {
    const [{ item }, drop] = useDrop(() => ({
        accept: DragDropTypes.Activity,
        drop: (item, monitor) => {
            if (monitor.didDrop()) {
                return
            }
            return { status: props.activityStatus }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            item: monitor.getItem()
        })
    }))

    const activitiesInList = Object.values(props.activities)
        .filter((activity: Activity) => activity.status === props.activityStatus)
        .sort((a, b) => a.rank - b.rank)

    return (
        <div ref={drop} className='activityList'>
            <h3 className='activityList__title'>{props.title}</h3>
            <div className='activityList__content'>
                {
                    activitiesInList.map((activity: Activity, idx: number) =>
                        <ActivityListItem key={activity.id} activity={activity} rank={idx} />
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        activities: state.activities
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    activityEdited: (activityData: Partial<Activity>) => dispatch(activityEdited(activityData))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityList)