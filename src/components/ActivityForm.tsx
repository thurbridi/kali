import React from "react"

import { connect, ConnectedProps, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../store/store"
import { activityRemovedAsync, activityAddedAsync, activityEditedAsync } from "../actions/activities"
import { Activity, Source } from "../types/types"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import MarkdownEditor from "./MardownEditor"
import { DateTime } from 'luxon'

interface Props extends PropsFromRedux {
    onSubmit: (event: React.BaseSyntheticEvent) => void
    source?: Source
    activity?: Activity
}

interface Inputs {
    title: string,
    description: string,
    isArchived: boolean,
    startDate: string
    dueDate: string
}

const ActivityForm = (props: Props) => {
    const activity = props.activity
    const source = props.source

    const sourceTitle = useSelector((state: AppState) => source ? source.title : state.sources[activity.sourceId].title)
    const sourceColor = useSelector((state: AppState) => source ? source.color : state.sources[activity.sourceId].color)

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            title: props.activity ? props.activity.title : '',
            description: props.activity ? props.activity.description : '',
            isArchived: props.activity ? props.activity.isArchived : false,
            startDate: undefined,
            dueDate: undefined,
        }
    })

    console.log(watch("dueDate"));
    if (watch('dueDate')) {
        console.log(DateTime.fromISO(watch("dueDate")).toISO());
    }

    const onSubmit: SubmitHandler<Inputs> = (data, event) => {
        const { title, description, isArchived } = data
        let { dueDate } = data

        dueDate = DateTime.fromISO(dueDate).toISO() // parsing to and from ISO adds timezone data

        activity ?
            props.activityEditedAsync({ ...activity, title, description, isArchived, dueDate })
            : props.activityAddedAsync({
                title,
                description,
                isArchived,
                sourceId: source.id,
                statusId: props.initalStatus,
                dueDate
            })
        props.onSubmit(event)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            < div className='color-banner' style={{ background: sourceColor }
            }>
                <div className="color-banner__activity-info">
                    {activity && <p style={{ color: '#fafafa' }}>{sourceTitle}</p>}
                    {activity && <p style={{ color: '#fafafa' }}>{activity.statusId}</p>}
                </div>
            </div >
            <input
                className='title'
                type='text'
                placeholder='Activity title'
                autoFocus
                {...register('title', { required: true })}
            />
            {errors.title && "Title is required"}
            <Controller
                control={control}
                name='description'
                render={({ field: { onChange, value } }) =>
                    <MarkdownEditor
                        startInEditMode={!props.activity}
                        onChange={onChange}
                        value={value}
                    />
                }
            />
            <div>
                <label>Due</label>
                <input
                    type='datetime-local'
                    {...register('dueDate')}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', padding: '.8rem' }}>
                <label>Archived</label>
                <input type="checkbox" placeholder="Archived" {...register("isArchived", {})} />
            </div>
            <button type='submit'>{activity ? 'Save' : 'Add activity'}</button>
        </form >
    )
}

const mapStateToProps = (state: AppState) => ({
    initalStatus: Object.values(state.statusLists).filter((list) => list.isInitial)[0].status
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    activityRemovedAsync: (id: string, statusId: string) => dispatch(activityRemovedAsync(id, statusId)),
    activityAddedAsync: (activityData: Partial<Activity>) => dispatch(activityAddedAsync(activityData)),
    activityEditedAsync: (activity: Activity) => dispatch(activityEditedAsync(activity))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ActivityForm)