import knex from '../database/connection'
import TodoDTO from 'utils/Dtos/TodoDTO'
import UpdateTodoDTO from 'utils/Dtos/UpdateTodoDTO'


class TodoRepository {
  async listAll () {
    return await knex<TodoDTO>('todos').select('*')
  }

  async create (todoDTO: TodoDTO) {
    return await knex<TodoDTO>('todos')
      .insert(todoDTO)
  }

  async update (todoId: number, todo: UpdateTodoDTO) {
    await knex<TodoDTO>('todos')
      .where('identificador', todoId)
      .update({
        completa: todo.completa,
        descricao: todo.descricao,
        prazo: todo.prazo
      })
  }

  async delete (todoId: number) {
    return await knex<TodoDTO>('todos').delete().where('descricao', todoId)
  }
}

export default TodoRepository
