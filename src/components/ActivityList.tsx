import React, { useContext } from 'react'
import ActivityListItem from './ActivityListItem'
import { Activity, ActivityStatus, DropTypes } from '../types/types'
import { connect } from 'react-redux'
import { useDrop } from 'react-dnd'

interface Props {
    title: string
    activities: Activity[]
    activityStatus: ActivityStatus
}

const ActivityList = (props: Props) => {
    const [{ item }, drop] = useDrop(() => ({
        accept: DropTypes.Activity,
        drop: () => ({ droppedIn: props.activityStatus }),
        collect: (monitor) => ({
            item: monitor.getItem()
        })
    }),
        [props.activityStatus]
    )

    const activitiesInList = Object.values(props.activities).filter((activity: Activity) =>
        activity.status === props.activityStatus
    )

    return (
        <div ref={drop} className='activityList'>
            <h3 className='activityList__title'>{props.title}</h3>
            <div className='activityList__content'>
                {
                    activitiesInList.map((activity: Activity) =>
                        <ActivityListItem key={activity.id} activity={activity} />
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

export default connect(mapStateToProps)(ActivityList)