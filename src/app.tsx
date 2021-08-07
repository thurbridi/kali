import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import KaliApp from './components/KaliApp';


const Counter = (props: { count: number }) => {
    const [count, setCount] = useState(props.count)
    const [text, setText] = useState('count')

    useEffect(() => {
        if (window.api.askForSomething({ count: count })) {
            console.log('IT WERKZZ')
        } else {
            console.log("No it doesn't")
        }
    })

    return (
        <div>
            <p>The current {text} is {count}</p>
            <button onClick={() => setCount(count + 1)}>Inc</button>
            <button onClick={() => setCount(count - 1)}>Dec</button>
            <button onClick={() => setCount(props.count)}>Reset</button>
            <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
    )
}

Counter.defaultProps = {
    count: 0
}

const notesReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return [
                ...state,
                action.note
            ]
        case 'REMOVE_NOTE':
            return state.filter((note: any) => note.title !== action.title)

        default:
            return state
    }
}

const NoteApp = () => {
    const [notes, dispatch] = useReducer(notesReducer, [])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'ADD_NOTE', note: { title, body } })
        setTitle('')
        setBody('')
    }

    const removeNote = (title: string) => {
        dispatch({ type: 'REMOVE_NOTE', title })
    }

    return (
        <div>
            <h1>Notes</h1>
            {notes.map((note: any) => (
                <div key={note.title}>
                    <h3>{note.title}</h3>
                    <p>{note.body}</p>
                    <button onClick={() => removeNote(note.title)}>x</button>
                </div>
            ))}
            <p>Add note</p>
            <form onSubmit={addNote}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <input value={body} onChange={(e) => setBody(e.target.value)} />
                <button>add note</button>
            </form>
        </div>
    )
}


ReactDOM.render(<KaliApp />, document.getElementById('root'))
