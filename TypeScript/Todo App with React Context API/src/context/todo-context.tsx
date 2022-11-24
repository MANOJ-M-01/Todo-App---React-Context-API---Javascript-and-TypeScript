import React, { createContext, ReactNode, useContext, useState } from 'react'

type todolistTypes = {
    id: number
    title: string
    completed: boolean
}

type todoTypes = {
    todolist: todolistTypes[]
    addTodo: (data: todolistTypes) => void
    updateTodoStatus: (id: number) => void
    removeTodo: (id: number) => void
}

const TodoContext = createContext<todoTypes>({} as todoTypes)

export const useTodo = () => {
    return useContext(TodoContext)
}

const initialState = [
    {
        id: 1,
        title: 'delectus aut autem',
        completed: false,
    },
    {
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
    },
    {
        id: 3,
        title: 'et porro tempora',
        completed: true,
    },
]

type PropsType = {
    children: React.ReactNode
}

function TodoProvider({ children }: PropsType) {
    const [todolist, setTodoList] = useState(initialState)

    const addTodo = (newTodo: todolistTypes) => {
        setTodoList([newTodo,
            ...todolist
        ])
    }
    const updateTodoStatus = (id: number) => {
        const newState = todolist.map((obj, index) => {
            if (index === id) {
                return { ...obj, completed: !obj.completed }
            }
            return obj
        })
        setTodoList(newState)
    }
    const removeTodo = (id: number) => {
        const updatedTodo = todolist.filter((_, index) => index != id)
        setTodoList(updatedTodo)
    }
    const todoValues = {
        todolist,
        addTodo,
        updateTodoStatus,
        removeTodo
    }

    return (
        <TodoContext.Provider value={todoValues}>{children}</TodoContext.Provider>
    )
}

export default TodoProvider
