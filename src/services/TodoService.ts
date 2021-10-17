import TodoRepository from '../repositories/TodoRepository'
import { InvalidParamError, MissingParamError, InvalidDateError } from '../utils/errors'
import TodoDTO from '../utils/Dtos/TodoDTO'
import HttpResponses from '../utils/HttpResponses'
import validarPrazo from '../utils/helpers/validarPrazo'
import UpdateTodoDTO from '../utils/Dtos/UpdateTodoDTO'

class TodoService {
  private readonly todoRepository: TodoRepository

  constructor () {
    this.todoRepository = new TodoRepository()
  }

  async listAll () {
    return await this.todoRepository.listAll()
  }

  async show (identificador: number) {
    if (!identificador) throw HttpResponses.badRequest(new MissingParamError('identificador'))

    if (typeof (identificador) !== 'number' || isNaN(identificador)) {
      throw HttpResponses.badRequest(new InvalidParamError('identificador'))
    }
  }

  async create ({ completa, prazo, descricao }: TodoDTO) {
    if (!descricao) throw HttpResponses.badRequest(new MissingParamError('descricao'))
    if (!prazo) throw HttpResponses.badRequest(new MissingParamError('prazo'))

    if (completa && typeof (completa) !== 'boolean') throw HttpResponses.badRequest(new InvalidParamError('completa'))
    if (typeof (descricao) !== 'string') throw HttpResponses.badRequest(new InvalidParamError('descricao'))

    const data = validarPrazo(prazo)

    const newTodo = await this.todoRepository.create({
      completa,
      prazo: data,
      descricao
    })

    return { identificador: newTodo[0] }
  }

  async update (identificador: number, { completa, prazo, descricao }: TodoDTO) {
    if (!identificador) throw HttpResponses.badRequest(new MissingParamError('identificador'))

    if (typeof (identificador) !== 'number' || isNaN(identificador)) {
      throw HttpResponses.badRequest(new InvalidParamError('identificador'))
    }

    const updateData: UpdateTodoDTO = {}

    if (prazo) {
      const data = validarPrazo(prazo)
      updateData.prazo = data
    }

    if (descricao) updateData.descricao = descricao
    if (completa !== undefined) updateData.completa = completa

    await this.todoRepository.update(identificador, updateData)
  }

  async delete (identificador: number) {
    if (typeof (identificador) !== 'number') throw HttpResponses.badRequest(new InvalidParamError('identificador'))
    await this.todoRepository.delete(identificador)
  }
}

export default TodoService
