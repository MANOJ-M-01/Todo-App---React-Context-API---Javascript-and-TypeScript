import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import { useTodo } from '../../context/todo-context'

function CreateTodo() {
    const [todoinput, setTodoinput] = useState('')
    const { addTodo } = useTodo()

    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (inputRef?.current) {
            inputRef?.current?.focus()
        }
    }, [])

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoinput(event.target.value)
    }
    const addNew = () => {
        if (!todoinput) return
        const new_todo = {
            id: 4,
            title: todoinput,
            completed: false
        }
        addTodo(new_todo)
        setTodoinput('')
    }
    return (
        <React.Fragment>
            <h3>New Todo</h3>
            <p id='new-todo'>
                <input ref={inputRef} id='new-task' type='text' value={todoinput} onChange={inputChange} />
                <button type='button' onClick={addNew}>Add</button>
            </p>
        </React.Fragment>
    )
}

export default CreateTodo