import React, { useContext } from 'react'
import { store } from '../store/store'
import ActivityListItem from './ActivityListItem'
import type { Activity } from '../types/types'

interface Props {
  title: string

}

const ActivityList = ({ title }: Props) => {
  const { state } = useContext(store)
  const activitiesInList = state.activities.filter((activity: Activity) =>
    activity.status.toLowerCase() === title.toLowerCase()
  )

  return (
    <div className='activityList'>
      <h2>{title}</h2>
      {
        activitiesInList.map((activity: Activity) =>
          <ActivityListItem key={activity.id} activity={activity} />
        )
      }
    </div>
  )
}

export default ActivityList