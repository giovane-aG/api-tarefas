import TodoRepository from '../repositories/TodoRepository'
import { InvalidParamError, MissingParamError } from '../utils/errors'
import TodoDTO from 'utils/Dtos/TodoDTO'
import HttpResponses from '../utils/HttpResponses'
import dayjs from 'dayjs'

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
    if (!(prazo)) throw HttpResponses.badRequest(new InvalidParamError('prazo'))

    const data = this.validarPrazo(prazo)

    const newTodo = await this.todoRepository.create({
      completa,
      prazo: data,
      descricao
    })

    return { identificador: newTodo[0] }
  }

  async update ({ completa, prazo, descricao }: TodoDTO) {
    
  }

  validarPrazo (prazo: string) {
    const now = dayjs()
    const dataPrazo = dayjs(prazo)

    if (dataPrazo < now) {
      throw HttpResponses.badRequest(new InvalidParamError('prazo'))
    }

    const data = dataPrazo.format('YYYY-MM-DD HH:mm:ss')
    if (data == 'Invalid Date') throw HttpResponses.badRequest(new InvalidParamError('prazo'))

    return data
  }
}

export default TodoService
