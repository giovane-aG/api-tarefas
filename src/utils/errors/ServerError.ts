
class ServerError extends Error {
  constructor () {
    super('Ocorreu um erro interno')
    this.name = 'ServerError'
  }
}

export default ServerError
