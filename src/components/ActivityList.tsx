import React, { useContext } from 'react'
import ActivityListItem from './ActivityListItem'
import type { Activity, ActivityStatus } from '../types/types'
import { connect } from 'react-redux'

interface Props {
    title: string
    activities: Activity[]
    activityStatus: ActivityStatus
}

const ActivityList = (props: Props) => {
    const activitiesInList = Object.values(props.activities).filter((activity: Activity) =>
        activity.status === props.activityStatus
    )

    return (
        <div className='activityList'>
            <h2>{props.title}</h2>
            {
                activitiesInList.map((activity: Activity) =>
                    <ActivityListItem key={activity.id} activity={activity} />
                )
            }
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        activities: state.activities
    }
}

export default connect(mapStateToProps)(ActivityList)