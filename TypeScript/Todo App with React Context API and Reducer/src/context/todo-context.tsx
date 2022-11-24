import React, { createContext, useContext, useReducer } from 'react'


type todolistTypes = {
    id: number
    title: string
    completed: boolean
}

type todoTypes = {
    todolist: todolistTypes[]
    TodoDispatch: (data: TodoAction) => void
}

type AddType = {
    type: 'ADD'
    payload: todolistTypes
}

type UpdateType = {
    type: 'REMOVE' | 'COMPLETE'
    payload: {
        id: number
    }
}
type TodoAction = AddType | UpdateType

const TodoContext = createContext<todoTypes>(null!)

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

const todoReducer = (todo: todolistTypes[], action: TodoAction) => {
    const { type, payload } = action
    switch (type) {
        case 'ADD': {
            return [
                payload,
                ...todo
            ]
        }
        case 'REMOVE': {
            const updatedTodo = todo.filter((_, index) => index != payload.id)
            return updatedTodo
        }
        case 'COMPLETE': {
            const newState = todo.map((obj, index) => {
                if (index === payload.id) {
                    return { ...obj, completed: !obj.completed }
                }
                return obj
            })
            return newState
        }
        default: {
            return todo
        }
    }
}

type PropsType = {
    children: React.ReactNode
}


function TodoProvider({ children }: PropsType) {
    const [todolist, TodoDispatch] = useReducer(todoReducer, initialState)
    const todoValues = {
        todolist,
        TodoDispatch
    }

    return (
        <TodoContext.Provider value={todoValues}>{children}</TodoContext.Provider>
    )
}

export default TodoProvider
