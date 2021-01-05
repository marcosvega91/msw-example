import {rest} from 'msw'

let todos = []

const BASE_URL = new URL('todos',process.env.REACT_APP_API).toString()

export const handlers = [
  rest.get(BASE_URL, (req, res,ctx) => {

    return res(
      ctx.status(200),
      ctx.json(todos)
    )
  }),
  rest.post(BASE_URL, (req, res,ctx) => {
    const { title } = req.body

    const todo = {
      id: todos.length+1, 
      completed:false,
      title:title, 
    }
    todos.push(todo)
    return res(
      ctx.status(201),
      ctx.json(todo)
    )
  }),
  rest.put(`${BASE_URL}/:id`, (req, res,ctx) => {
    const { completed } = req.body
    const {id} = req.params

    const todo = Object.assign({}, todos.find((todo) => todo.id === parseInt(id,10) ))
    todo.completed = completed
    const indexTodo = todos.findIndex((todo) => todo.id === id)
    todos = [...todos.slice(0, indexTodo), todo, ...todos.slice(indexTodo+1)]
    return res(
      ctx.status(200),
      ctx.json(todo)
    )
  })
]