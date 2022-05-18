import { getRandomColor } from '../utils/colorSwatches'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import type { Color, Source } from '../types/types'
import React from 'react'
import { sourceRemovedAsync, sourceAddedAsync, sourceEditedAsync } from '../actions/sources'
import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch } from '../store/store'
import MarkdownEditor from './MardownEditor'


interface Props extends PropsFromRedux {
    onSubmit: (event: React.BaseSyntheticEvent) => void
    sourceItem?: Source
}

interface Inputs {
    color: Color,
    title: string,
    description: string,
}

const SourceForm = (props: Props) => {
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            color: props.sourceItem ? props.sourceItem.color : getRandomColor(),
            title: props.sourceItem ? props.sourceItem.title : '',
            description: props.sourceItem ? props.sourceItem.description : '',
        }
    })

    const onSubmit: SubmitHandler<Inputs> = (data, event) => {
        const { title, description, color } = data
        props.sourceItem ?
            props.sourceEditedAsync({ ...props.sourceItem, title, description, color })
            : props.sourceAddedAsync({ title, description, color })
        props.onSubmit(event)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='color-banner' style={{ background: watch('color') }}>
                <input
                    className='color color--no-border'
                    type='text'
                    defaultValue={watch('color')}
                    style={{ background: watch('color'), color: "#fafafa" }}
                    {...register('color', {
                        pattern: /^#[0-9a-f]{6}/i,
                        maxLength: 7,
                    })}
                />
                {errors.color && "Color should be in HEX format"}
            </div>
            <input
                className='title'
                type='text'
                placeholder='Source title'
                autoFocus
                {...register('title', { required: true })}
            />
            {errors.title && "Title is required"}
            <Controller
                control={control}
                name='description'
                render={({ field: { onChange, value } }) =>
                    <MarkdownEditor
                        startInEditMode={!props.sourceItem}
                        onChange={onChange}
                        value={value}
                    />
                }
            />

            <button type='submit'>{props.sourceItem ? 'Save' : 'Add'}</button>
        </form>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    sourceRemovedAsync: (id: string) => dispatch(sourceRemovedAsync(id)),
    sourceAddedAsync: (sourceData: Partial<Source>) => dispatch(sourceAddedAsync(sourceData)),
    sourceEditedAsync: (source: Source) => dispatch(sourceEditedAsync(source))
})

const connector = connect(undefined, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SourceForm)