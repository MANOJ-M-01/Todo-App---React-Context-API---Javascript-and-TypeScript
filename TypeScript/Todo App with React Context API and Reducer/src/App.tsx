import TodoProvider from './context/todo-context'
import CreateTodo from './components/todo/create'
import TodoList from './components/todo/list'

function App() {
  return (
    <div className='container'>
      <h2>Todo</h2>
      <TodoProvider>
        <CreateTodo />
        <TodoList />
      </TodoProvider>
    </div>
  )
}

export default App