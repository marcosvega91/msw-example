
function saveTodos(todos){
  localStorage.setItem('todos', JSON.stringify(todos))
}
  

const api = {
  get:() => {
    return JSON.parse(localStorage.getItem('todos')) || []
  },
  add: (title) => {
    const todos = api.get()
    const todo = {
      id: todos.length+1, 
      completed:false,
      title:title, 
    }
    todos.push(todo)
    saveTodos(todos)
    return todo
  },
  update: (id,data) => {
    const todos = api.get()
    const todo = Object.assign({}, todos.find((todo) => todo.id === parseInt(id,10) ),data)
    const indexTodo = todos.findIndex((todo) => todo.id === id)
    saveTodos([...todos.slice(0, indexTodo), todo, ...todos.slice(indexTodo+1)])
    return todo  
  },
  clear:() => localStorage.removeItem('todos')
}

export default api