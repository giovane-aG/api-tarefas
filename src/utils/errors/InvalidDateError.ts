
class InvalidDateError extends Error {
  constructor () {
    super()
    this.name = 'InvalidDateError'
    this.message = 'O campo prazo está incorreto, insira uma data no formato YYYY-MM-DD HH:mm:ss'
  }
}

export default InvalidDateError
