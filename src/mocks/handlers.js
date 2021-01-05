import {rest} from 'msw'
import api from './data/todos'


const BASE_URL = new URL('todos',process.env.REACT_APP_API).toString()

export const handlers = [
  rest.get(BASE_URL, (req, res,ctx) => {

    return res(
      ctx.status(200),
      ctx.json(api.get())
    )
  }),
  rest.post(BASE_URL, (req, res,ctx) => {
    const { title } = req.body

    return res(
      ctx.status(201),
      ctx.json(api.add(title))
    )
  }),
  rest.put(`${BASE_URL}/:id`, (req, res,ctx) => {
    const { completed } = req.body
    const {id} = req.params

    return res(
      ctx.status(200),
      ctx.json(api.update(id,{completed}))
    )
  })
]