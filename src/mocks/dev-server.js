import {setupWorker} from 'msw'
import {factory, primaryKey, identity} from '@mswjs/data'
import {random} from 'faker'


const db = factory({
  todos:{
    id:primaryKey(random.uuid),
    title: String,
    completed: identity(false)
  }
})

db.todos.create({
  title: 'go to work'
})

const worker = setupWorker(...db.todos.toHandlers(process.env.REACT_APP_API))


export {worker}