import React, { useEffect, useState } from "react"
import SourceListItem from './SourceListItem'
import { Source, Activity, ActivityStatus, StatusList } from '../types/types'
import Modal from 'react-modal'
import SourceForm from "./SourceForm"
import { connect, ConnectedProps } from "react-redux"
import { AppState } from "../store/store"

interface Props extends PropsFromRedux {
}

const SourceList = (props: Props) => {
    const [open, setOpen] = useState(false)

    useEffect(() => Modal.setAppElement('body'), [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpen(false)
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Sources</h2>
                <button onClick={() => setOpen(true)}>+</button>
            </div>
            {
                Object.values(props.sources).map((source: Source) => {
                    const sourceActivities = Object.values(props.activities).filter((activity) => activity.sourceId === source.id)
                    const numCompleted = props.terminalStatusList.activityIds
                        .map((activityId) => props.activities[activityId])
                        .filter((activity) => activity.sourceId === source.id).length

                    return <SourceListItem
                        key={source.id}
                        source={source}
                        numActivities={sourceActivities.length}
                        numCompletedActivities={numCompleted}
                    />
                })
            }
            <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
                <SourceForm onSubmit={onSubmit} />
            </Modal>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    sources: state.sources,
    activities: state.activities,
    terminalStatusList: Object.values(state.statusLists).filter((list) => list.isTerminal)[0] as StatusList
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SourceList)