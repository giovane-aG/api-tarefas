
class InvalidParamError extends Error {
  constructor (paramName: string) {
    super()
    this.message = `O campo ${paramName} está incorreto`
    this.name = 'InvalidParamError'
  }
}

export default InvalidParamError
