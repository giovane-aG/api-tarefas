import Knex from 'knex'


const connection = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
}

const createDatabase = async () => {
  const databaseName = 'todos_database'

  let knex = Knex({
    client: 'mysql',
    connection
  })

  await knex.raw('CREATE DATABASE IF NOT EXISTS ??', databaseName)

  knex = Knex({
    client: 'mysql',
    connection: {
      ...connection, database: databaseName
    },
  })

}

createDatabase().catch(console.log).then(() => process.exit())