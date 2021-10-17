import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return await knex.schema.createTable('todos', (table) => {
    table.increments('identificador')
    table.string('descricao')
    table.dateTime('prazo')
    table.boolean('completa')
  })
}

export async function down (knex: Knex): Promise<void> {
  return await knex.schema.dropTable('todos')
}
