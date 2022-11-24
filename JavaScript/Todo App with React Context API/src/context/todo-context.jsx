import { createContext, useContext, useState } from 'react'

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

function TodoProvider({ children }) {
    const [todolist, setTodoList] = useState(initialState)

    const addTodo = (newTodo) => {
        setTodoList([newTodo,
            ...todolist
        ])
    }
    const updateTodoStatus = (id) => {
        const newState = todolist.map((obj, index) => {
            if (index === id) {
                return { ...obj, completed: !obj.completed }
            }
            return obj
        })
        setTodoList(newState)
    }
    const removeTodo = (id) => {
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
