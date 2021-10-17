import TodoRepository from '../repositories/TodoRepository'
import { InvalidParamError, MissingParamError, InvalidDateError } from '../utils/errors'
import TodoDTO from 'utils/Dtos/TodoDTO'
import HttpResponses from '../utils/HttpResponses'
import moment from 'moment'
import UpdateTodoDTO from 'utils/Dtos/UpdateTodoDTO'

class TodoService {
  private readonly todoRepository: TodoRepository

  constructor () {
    this.todoRepository = new TodoRepository()
  }

  async listAll () {
    return await this.todoRepository.listAll()
  }

  async create ({ completa, prazo, descricao }: TodoDTO) {
    if (!descricao) throw HttpResponses.badRequest(new MissingParamError('descricao'))
    if (!prazo) throw HttpResponses.badRequest(new MissingParamError('prazo'))

    if (completa && typeof (completa) !== 'boolean') throw HttpResponses.badRequest(new InvalidParamError('completa'))
    if (typeof (descricao) !== 'string') throw HttpResponses.badRequest(new InvalidParamError('descricao'))
    if (typeof(prazo) !== 'string') throw HttpResponses.badRequest(new InvalidParamError('prazo'))

    const data = this.validarPrazo(prazo)

    const newTodo = await this.todoRepository.create({
      completa,
      prazo: data,
      descricao
    })

    return { identificador: newTodo[0] }
  }

  async update (identificador: number, { completa, prazo, descricao }: TodoDTO) {

    if (!identificador) throw HttpResponses.badRequest(new MissingParamError('identificador'))

    if (typeof(identificador) !== 'number' || isNaN(identificador)){
      throw HttpResponses.badRequest(new InvalidParamError('identificador'))
    }
    
    let updateData: UpdateTodoDTO = {}

    if (prazo) {
      const data = this.validarPrazo(prazo)
      updateData.prazo = data
    }
    
    if (descricao) updateData.descricao = descricao
    if (completa !== undefined) updateData.completa = completa

    await this.todoRepository.update(identificador, updateData)
  }

  validarPrazo (prazo: string) {
    const now = moment()
    const dataPrazo = moment(prazo)

    if (dataPrazo < now) {
      throw HttpResponses.badRequest(new InvalidParamError('prazo'))
    }

    const data = dataPrazo.format('YYYY-MM-DD HH:mm:ss')
    if (data == 'Invalid date') throw HttpResponses.badRequest(new InvalidDateError())

    return data
  }
}

export default TodoService
