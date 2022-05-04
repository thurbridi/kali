import React, { useState } from 'react';
import type { Source } from '../types/types';
import { connect, ConnectedProps } from 'react-redux'
import { sourceAddedAsync, sourceEdited, sourceEditedAsync } from '../actions/sources';
import { AppDispatch } from '../store/store';
import { colorSwatch1 } from '../colorSwatches';

interface Props extends PropsFromRedux {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    sourceItem?: Source
}

const SourceForm = (props: Props) => {
    const colorIdx = Math.floor(Math.random() * (colorSwatch1.length - 1))
    const defaultColor = colorSwatch1[colorIdx]

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
        <form onSubmit={(event) => {
            props.sourceItem ? props.sourceEditedAsync({ ...props.sourceItem, title, description, color }) : props.sourceAddedAsync({ title, description })
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
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    sourceAddedAsync: (sourceData: Partial<Source>) => dispatch(sourceAddedAsync(sourceData)),
    sourceEditedAsync: (source: Source) => dispatch(sourceEditedAsync(source))
})

const connector = connect(undefined, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SourceForm)