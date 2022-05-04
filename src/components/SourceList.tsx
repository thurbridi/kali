import React, { useEffect, useState } from "react"
import SourceListItem from './SourceListItem'
import { Source, Activity, ActivityStatus } from '../types/types'
import Modal from 'react-modal'
import SourceForm from "./SourceForm"
import { connect } from "react-redux"
import { RootState } from "../store/store"


const SourceList = (props: any) => {
    const [open, setOpen] = useState(false)

    useEffect(() => Modal.setAppElement('body'), [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpen(false)
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Sources</h3>
                <button onClick={() => setOpen(true)}>+</button>
            </div>
            {
                Object.values(props.sources).map((source: Source) => {
                    const sourceActivities = Object.values(props.activities).filter((activity: Activity) => activity.sourceId === source.id)
                    const numCompleted = sourceActivities.filter((activity: Activity) => activity.status === ActivityStatus.Done).length

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

const mapStateToProps = (state: RootState) => {
    return {
        sources: state.sources,
        activities: state.activities,
    }
}

export default connect(mapStateToProps)(SourceList)