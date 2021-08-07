import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'


interface Activity {
  id: string
  title: string
  description: string
  startDate: string | undefined
  endDate: string | undefined
  dueDate: string | undefined
  sourceID: string
  status: string
}

interface Source {
  id: string
  name: string
  activities: Activity[]
}

const srcId1 = uuidv4()
const srcId2 = uuidv4()
const sources: Source[] = [
  {
    id: srcId1,
    name: 'Kali App',
    activities: [
      {
        id: uuidv4(),
        title: 'Develop Kali',
        description: 'basically Trello 2',
        startDate: 'Aug 6th',
        endDate: undefined,
        dueDate: 'Aug 31st',
        sourceID: srcId1,
        status: 'Doing',
      },
      {
        id: uuidv4(),
        title: 'Learn React enough to do this',
        description: 'The Complete React Developer Course',
        startDate: 'Aug 1st',
        endDate: 'Aug 6th',
        dueDate: undefined,
        sourceID: srcId1,
        status: 'Done',
      }
    ]
  },
  {
    id: srcId2,
    name: 'Physics',
    activities: [
      {
        id: uuidv4(),
        title: 'Learn about blackholes',
        description: 'where do they put stuff?',
        startDate: undefined,
        endDate: undefined,
        dueDate: undefined,
        sourceID: srcId2,
        status: 'Backlog',
      },
    ]
  }
]

const SourcesContext = React.createContext(sources)

const ActivityList = (props: any) => {
  const sources = useContext(SourcesContext)
  const activities = sources.reduce((a, b) => [...a, ...b.activities], [])

  return (
    <div>
      <h2>{props.title}</h2>
      {
        activities.filter(
          activity => activity.status === props.title
        ).map(activity => <ActivityListItem key={activity.id} activity={activity} />)
      }
    </div>
  )
}

const ActivityListItem = ({ activity }: any) => {
  return (
    <div>
      <h4>{activity.title}</h4>
      {activity.description && <p>{activity.description}</p>}
      {activity.dueDate && <p>Due: {activity.dueDate}</p>}
    </div>
  )

}



const SourcesList = () => {
  const sources = useContext(SourcesContext)

  return (
    <div>
      <h3>Sources:</h3>
      {sources.map(source => <SourceListItem key={source.id} source={source} />)}
    </div>
  )
}

const SourceListItem = ({ source }: any) => {
  const numCompleted = source.activities.filter(
    (activity: Activity) => activity.status === 'Done').length

  return (
    <div>
      <p>{source.name}</p>
      <p>{numCompleted}/{source.activities.length}</p>
    </div>
  )
}

const KaliApp = () => {
  return (
    <SourcesContext.Provider value={sources}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SourcesList />
        <ActivityList title='Backlog' />
        <ActivityList title='Available' />
        <ActivityList title='Doing' />
        <ActivityList title='Done' />
      </div >
    </SourcesContext.Provider>
  )
}

export default KaliApp