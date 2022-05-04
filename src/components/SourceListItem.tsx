import React, { useState } from "react"
import type { Source } from '../types/types'
import Modal from 'react-modal';
import SourceForm from "./SourceForm";
import { sourceRemovedAsync } from "../actions/sources";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch } from "../store/store";

interface Props {
    source: Source,
    numActivities: number,
    numCompletedActivities: number,
}

const SourceListItem = (props: Props) => {
    const [open, setOpen] = useState(false)


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpen(false)
    }

    return (
        <div className='sourceList__item' >
            <div className="source-card__banner" style={{ "background": props.source.color }} />
            <div className="source-card__content">
                <div onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
                    <p>{props.source.title}</p>
                    <p>{props.numCompletedActivities}/{props.numActivities} Completed</p>
                </div>
                <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
                    <SourceForm onSubmit={onSubmit} sourceItem={props.source} />
                </Modal>
            </div>
        </div >
    )
}

const connector = connect(undefined, undefined)


export default connector(SourceListItem)