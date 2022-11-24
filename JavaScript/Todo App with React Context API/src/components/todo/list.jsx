import { useTodo } from '../../context/todo-context'

function TodoList() {
    const { todolist, updateTodoStatus, removeTodo } = useTodo()
    const handleDelete = (id) => {
        removeTodo(id)
    }
    const handleChecked = (id) => {
        updateTodoStatus(id)
    }

    return (
        <>
            <h3>Todo List</h3>
            {todolist.length == 0 && <h4>Todo Empty</h4>}
            <ul>
                {todolist.map((item, index) => (
                    <li key={index} className={`banner ${item.completed ? 'completed' : ''}`}>
                        <input type='checkbox' checked={item.completed ? true : false} onChange={() => handleChecked(index)} />
                        <label>{item.title}</label>
                        {/* <button className='edit'>Edit</button> */}
                        <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default TodoList