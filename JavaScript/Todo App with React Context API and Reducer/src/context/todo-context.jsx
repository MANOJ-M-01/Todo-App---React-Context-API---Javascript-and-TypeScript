import { createContext, useContext, useReducer } from 'react'

const TodoContext = createContext()

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

const todoReducer = (todo, action) => {
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

function TodoProvider({ children }) {
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
