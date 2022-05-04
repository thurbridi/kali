import React, { useState } from 'react';
import type { Activity, Source } from '../types/types';
import { connect, ConnectedProps } from 'react-redux'
import { sourceAddedAsync, sourceEditedAsync, sourceRemovedAsync } from '../actions/sources';
import { AppDispatch, AppState } from '../store/store';
import { colorSwatch1 } from '../colorSwatches';
import ActivityListItem from './ActivityListItem';
import ActivityForm from "./ActivityForm";
import Modal from 'react-modal';

interface Props extends PropsFromRedux {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    sourceItem?: Source
}

const SourceForm = (props: Props) => {
    const colorIdx = Math.floor(Math.random() * (colorSwatch1.length - 1))
    const defaultColor = colorSwatch1[colorIdx]

    const [openActivity, setOpenActivity] = useState(false)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOpenActivity(false)
    }


    const [title, setTitle] = useState(props.sourceItem ? props.sourceItem.title : '')
    const [description, setDescription] = useState(props.sourceItem ? props.sourceItem.description : '')
    const [color, setColor] = useState(props.sourceItem ? props.sourceItem.color : defaultColor)

    const onTitleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }

    const onDescriptionChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    const onColorChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setColor(`#${event.target.value.slice(1)}`)
    }

    return (
        <div >
            <form onSubmit={(event) => {
                props.sourceItem ? props.sourceEditedAsync({ ...props.sourceItem, title, description, color }) : props.sourceAddedAsync({ title, description, color })
                props.onSubmit(event)
            }}>
                <div className='source-form__color-banner' style={{ height: "10rem", background: color }}>
                    <input
                        type='text'
                        value={color}
                        onChange={onColorChange}
                        placeholder='#'
                        style={{ maxWidth: "7rem", background: color, color: "#fafafa" }}
                    />
                </div>
                <input
                    className='title'
                    type='text'
                    value={title}
                    onChange={onTitleChange}
                    placeholder='Source title'
                />
                <textarea
                    className='detail'
                    value={description}
                    onChange={onDescriptionChange}
                    placeholder='Description'
                />

                <button>{props.sourceItem ? 'Save' : 'Add'}</button>
            </form>
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
                                    <ActivityListItem key={activity.id} activity={activity} hideDetails={true} />
                                )
                            }
                        </div>
                        <div style={{ alignSelf: "center" }}>
                            <button className="button--cautious" onClick={() => {
                                props.sourceRemovedAsync(props.sourceItem.id)
                            }}>Remove Source</button>
                        </div>
                        <Modal isOpen={openActivity} onRequestClose={() => setOpenActivity(false)}>
                            <ActivityForm source={props.sourceItem} onSubmit={onSubmit} />
                        </Modal>
                    </div>
                    : null
            }
        </div>
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
    sourceAddedAsync: (sourceData: Partial<Source>) => dispatch(sourceAddedAsync(sourceData)),
    sourceEditedAsync: (source: Source) => dispatch(sourceEditedAsync(source))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SourceForm)