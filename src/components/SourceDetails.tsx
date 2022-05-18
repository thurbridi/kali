import React, { useState } from 'react'
import type { Activity, Source } from '../types/types'
import { connect, ConnectedProps } from 'react-redux'
import { sourceRemovedAsync } from '../actions/sources'
import { AppDispatch, AppState } from '../store/store'
import ActivityListItem from './ActivityListItem'
import ActivityDetails from "./ActivityDetails"
import SourceForm from "./SourceForm"
import Modal from 'react-modal'


interface Props extends PropsFromRedux {
    onSubmit: (event: React.BaseSyntheticEvent) => void
    sourceItem?: Source
}

const SourceDetails = (props: Props) => {
    const [openActivity, setOpenActivity] = useState(false)

    return (
        <div>
            <SourceForm onSubmit={props.onSubmit} sourceItem={props.sourceItem} />
            {
                props.sourceItem ?
                    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h3>Activities</h3>
                            <button onClick={() => setOpenActivity(true)}>+</button>
                        </div>
                        <div>
                            {
                                props.sourceActivities.map((activity: Activity) =>
                                    <ActivityListItem
                                        key={activity.id}
                                        activity={activity}
                                        showStatus={true}
                                    />
                                )
                            }
                        </div>
                        <div style={{ alignSelf: "center" }}>
                            <button className="button--cautious" onClick={() => {
                                props.sourceRemovedAsync(props.sourceItem.id)
                            }}>Remove Source</button>
                        </div>
                        <Modal isOpen={openActivity} onRequestClose={() => setOpenActivity(false)}>
                            <ActivityDetails
                                source={props.sourceItem}
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    setOpenActivity(false)
                                }}
                            />
                        </Modal>
                    </div>
                    : null
            }
        </div >
    )
}

const mapStateToProps = (state: AppState, props: any) => {
    const sourceActivities = props.sourceItem ? Object.values(state.activities).filter((activity: Activity) =>
        activity.sourceId === props.sourceItem.id
    ) : null
    return {
        sourceActivities
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    sourceRemovedAsync: (id: string) => dispatch(sourceRemovedAsync(id)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SourceDetails)