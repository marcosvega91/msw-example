import * as React from 'react'
import './App.css';

const ENTER_KEY = 13

function App() {
  const [todos, setTodos] = React.useState([])

  React.useEffect(() => {
    fetch(new URL('todos', process.env.REACT_APP_API)).then(async (response) => {
      const body = await response.json()
      setTodos(body)
    })
  },[])

  const handleNewTodoKeyDown = async (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    
    const response = await fetch(new URL('todos', process.env.REACT_APP_API),{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        title:event.target.value
      })
    })
    event.target.value = ""
    const todo = await response.json()
    setTodos((todos) => [...todos,todo])
  }

  const markComplete = async (todo) => {
    const response = await fetch(new URL(`todos/${todo.id}`, process.env.REACT_APP_API),{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        completed:!todo.completed
      })
    })
    const updatedTodo = await response.json()

    setTodos((todos) => {
      const indexTodo = todos.findIndex((currentTodo) => currentTodo.id === todo.id)
      return [...todos.slice(0, indexTodo), updatedTodo, ...todos.slice(indexTodo+1)]
    } )
  }

  return (
    <div className="App">
      <header className="App-header">Todos</header>
      <section>
        <div>
          <input
            placeholder="What needs to be done?"
            onKeyDown={ e => handleNewTodoKeyDown(e) }
          />
        </div>
        <div>
          <ul>
            {
              todos.map((todo)=> <li key={todo.id} onClick={() => markComplete(todo)}>{todo.title}</li>)
            }
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
