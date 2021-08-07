import React, { useContext } from 'react'
import { store } from '../store/store'
import ActivityListItem from './ActivityListItem'
import type { Activity } from '../types/types'


const ActivityList = (props: any) => {
  const { state } = useContext(store)
  const activities = state.activities

  return (
    <div>
      <h2>{props.title}</h2>
      {
        activities.filter(
          (activity: Activity) => activity.status === props.title
        ).map((activity: Activity) => <ActivityListItem key={activity.id} activity={activity} />)
      }
    </div>
  )
}

export default ActivityList