import knex from '../database/connection'
import TodoDTO from 'utils/Dtos/TodoDTO'

class TodoRepository {
  async listAll () {
    return await knex<TodoDTO>('todos').select('*')
  }

  async create (todoDTO: TodoDTO) {
    return await knex<TodoDTO>('todos')
      .insert(todoDTO)
  }

  async update (todoId: number, todo: TodoDTO) {
    return await knex<TodoDTO>('todos')
      .update(todo)
      .where('descricao', todoId)
  }

  async delete (todoId: number) {
    return await knex<TodoDTO>('todos').delete().where('descricao', todoId)
  }
}

export default TodoRepository
