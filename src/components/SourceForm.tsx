import React, { useState } from 'react';
import type { Source } from '../types/types';
import { connect, ConnectedProps } from 'react-redux'
import { sourceAddedAsync, sourceEdited, sourceEditedAsync } from '../actions/sources';
import { AppDispatch } from '../store/store';

interface Props extends PropsFromRedux {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    sourceItem?: Source
}

const SourceForm = (props: Props) => {
    const [title, setTitle] = useState(props.sourceItem ? props.sourceItem.title : '')
    const [description, setDescription] = useState(props.sourceItem ? props.sourceItem.description : '')

    const onTitleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }

    const onDescriptionChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }

    return (
        <form className='form' onSubmit={(event) => {
            props.sourceItem ? props.sourceEditedAsync({ ...props.sourceItem, title, description }) : props.sourceAddedAsync({ title, description })
            props.onSubmit(event)
        }}>
            <input
                type='text'
                value={title}
                onChange={onTitleChange}
                placeholder='Source title'
            />
            <textarea
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