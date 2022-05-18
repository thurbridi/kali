import React from "react"
import { Activity, Source } from '../types/types'
import { connect, ConnectedProps } from "react-redux"
import { activityRemovedAsync } from "../actions/activities"
import { AppDispatch, AppState } from "../store/store"

import ActivityForm from "./ActivityForm"


interface Props extends PropsFromRedux {
    onSubmit: (event: React.BaseSyntheticEvent) => void
    source?: Source
    activity?: Activity
}

const ActivityDetails = (props: Props) => {
    const activity = props.activity

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <ActivityForm onSubmit={props.onSubmit} source={props.source} activity={props.activity} />
            {
                activity ?
                    <div style={{ alignSelf: "center" }
                    } >
                        <button className="button--cautious"
                            onClick={() => props.activityRemovedAsync(activity.id, activity.statusId)}
                        >
                            Remove Activity
                        </button>
                    </div >
                    : null
            }
        </div >
    )
}

const mapStateToProps = (state: AppState) => ({
    initalStatus: Object.values(state.statusLists).filter((list) => list.isInitial)[0].status
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    activityRemovedAsync: (id: string, statusId: string) => dispatch(activityRemovedAsync(id, statusId)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityDetails)