
class MissingParamError extends Error {
  constructor (paramName: string) {
    super()
    this.name = 'MissingParamError'
    this.message = `É necessário preencher o campo ${paramName}`
  }
}

export default MissingParamError
