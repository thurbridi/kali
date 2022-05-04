import React, { useState } from "react"
import type { Source } from '../types/types'
import Modal from 'react-modal';
import ActivityForm from "./ActivityForm";
import SourceForm from "./SourceForm";
import { sourceRemovedAsync } from "../actions/sources";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch } from "../store/store";

interface Props extends PropsFromRedux {
    source: Source,
    numActivities: number,
    numCompletedActivities: number,
}

const SourceListItem = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [openActivity, setOpenActivity] = useState(false)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpen(false)
        setOpenActivity(false)
    }

    const onRemove = () => {
        props.sourceRemovedAsync(props.source.id)
    }

    return (
        <div className='sourceList__item' >
            <div className="source-card__banner" />
            <div className="source-card__content">
                <div onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
                    <p>{props.source.title}</p>
                    <p>{props.numCompletedActivities}/{props.numActivities} Completed</p>
                </div>
                <div>
                    <button onClick={onRemove}>Remove Source</button>
                    <button onClick={() => setOpenActivity(true)}>Add activity</button>
                </div>
                <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
                    <SourceForm onSubmit={onSubmit} sourceItem={props.source} />
                </Modal>

                <Modal isOpen={openActivity} onRequestClose={() => setOpenActivity(false)}>
                    <ActivityForm source={props.source} onSubmit={onSubmit} />
                </Modal>
            </div>
        </div >
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    sourceRemovedAsync: (id: string) => dispatch(sourceRemovedAsync(id))
})

const connector = connect(undefined, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SourceListItem)