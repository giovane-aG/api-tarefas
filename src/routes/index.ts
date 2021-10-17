import express from 'express'

import TodoController from '../controllers/TodoController'

const app = express()
app.use(express.json())

const todoController = new TodoController()

app.get('/tarefas', todoController.index)
app.post('/tarefas', todoController.create)

app.listen(3000, () => {
  console.log('-----------------Server running on port 3000-----------------')
})
