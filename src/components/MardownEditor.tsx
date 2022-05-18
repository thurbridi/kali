import React, { useState } from 'react';
import { AiFillEdit, AiFillEye } from 'react-icons/ai'
import MardownRenderer from './MarkdownRenderer';

interface Props {
    startInEditMode: boolean
    value?: string
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const MarkdownEditor = (props: Props) => {
    const [editMode, setEditMode] = useState(props.startInEditMode)
    const [textContent, setTextContent] = useState(props.value ? props.value : '')

    const Toggle = (
        <div onClick={() => setEditMode(!editMode)}>
            {
                editMode ?
                    <AiFillEye />
                    : <AiFillEdit />
            }
        </div>
    )

    const Editor = (
        <textarea
            className='markdown-editor__input'
            onChange={(event) => { setTextContent(event.target.value); props.onChange(event) }}
            value={textContent}
            placeholder='Description'
        />
    )

    return (
        <div className='markdown-editor'>
            <div className='markdown-editor__toolbar'>
                {Toggle}
            </div>
            {editMode ? Editor : <MardownRenderer className='markdown-editor__preview'>{textContent}</MardownRenderer>}
        </div>
    )
}

export default MarkdownEditor