import React, { useContext } from "react"
import { store } from '../store/store'
import SourceListItem from './SourceListItem'

import type { Source } from '../types/types'

const SourceList = () => {
  const { state } = useContext(store)

  return (
    <div>
      <h3>Sources</h3>
      {state.sources.map((source: Source) => <SourceListItem key={source.id} source={source} />)}
    </div>
  )
}

export default SourceList