import type { Source, Action, Activity, AppState, AppReducer } from '../types/types'
import combineReducers from 'react-combine-reducers'
import { v4 as uuidv4 } from 'uuid'
import tagsReducer from '../reducers/tags'
import sourcesReducer from '../reducers/sources'
import activitiesReducer from '../reducers/activities'


// hardcoded initial states
const srcId1 = uuidv4()
const srcId2 = uuidv4()
const actId1 = uuidv4()
const actId2 = uuidv4()
const actId3 = uuidv4()


export const initialSources: Source[] = [
  // {
  //   id: srcId1,
  //   name: 'Kali App',
  // },
  // {
  //   id: srcId2,
  //   name: 'Physics',
  // }
]

const initialActivities: Activity[] = [
  // {
  //   id: actId1,
  //   title: 'Learn about blackholes',
  //   description: 'where do they put stuff?',
  //   startDate: undefined,
  //   endDate: undefined,
  //   dueDate: undefined,
  //   sourceID: srcId2,
  //   status: 'Backlog',
  // },
  // {
  //   id: actId2,
  //   title: 'Learn React enough to do this',
  //   description: 'The Complete React Developer Course',
  //   startDate: 'Aug 1st',
  //   endDate: 'Aug 6th',
  //   dueDate: undefined,
  //   sourceID: srcId1,
  //   status: 'Done',
  // },
  // {
  //   id: actId3,
  //   title: 'Develop Kali',
  //   description: 'basically Trello 2',
  //   startDate: 'Aug 6th',
  //   endDate: undefined,
  //   dueDate: 'Aug 31st',
  //   sourceID: srcId1,
  //   status: 'Doing',
  // },
]

const initialTags: string[] = []
// -----


const [appReducer, initialAppState] = combineReducers<AppReducer>(
  {
    tags: [tagsReducer, initialTags],
    sources: [sourcesReducer, initialSources],
    activities: [activitiesReducer, initialActivities]
  }
)

export { appReducer, initialAppState }