import { Request, Response } from 'express'
import { MissingParamError, InvalidParamError } from '../utils/errors'
import TodoService from '../services/TodoService'
import HttpResponses from '../utils/HttpResponses'

const todoService = new TodoService()

class TodoController {
  async index (request: Request, response: Response) {
    try {
      const todos = await todoService.listAll()
      return response.status(200).json(todos)
    } catch (error: any) {
      return response.status(500).json('Ocorreu um erro ao buscar as tarefas')
    }
  }

  async create (request: Request, response: Response) {
    try {
      const {
        completa = false,
        descricao,
        prazo
      } = request.body

      const createdTodo = await todoService.create({
        completa,
        descricao,
        prazo
      })

      const resposta = HttpResponses.created(createdTodo)

      return response.status(resposta.statusCode).json(resposta.body)
    } catch (error: any) {

      return response.status(error.statusCode).json(error.body.message)
    }
  }

  async update (request: Request, response: Response) {
    try {
      const { identificador } = request.params

      const {
        completa = false,
        descricao,
        prazo
      } = request.body

      await todoService.update(parseInt(identificador), {completa, descricao, prazo})

      return response.status(200).json({ 
        identificador,
        mensagem: 'Tarefa alterada com sucesso'
      })
    } catch (error: any)  {
      return response.status(error.statusCode).json(error.body.message)
    }
  }

  async delete (request: Request, response: Response) {
    try {
      const { identificador } = request.params
      
      await todoService.delete(parseInt(identificador))

      return response.status(200).json({ mensagem: `Tarefa ${identificador} excluída com sucesso` })
    } catch (error: any) {
      return response.status(error.statusCode).json(error.body.message)
    }
  }

}

export default TodoController
