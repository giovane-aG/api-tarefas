import knex from 'knex'

export default knex({
  client: 'sqlite3',
    connection: {
      filename: './database.sqlite'
    },
    migrations: {
      directory: './migrations'
    }
})
