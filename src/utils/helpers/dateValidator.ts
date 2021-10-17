import moment from 'moment'
import HttpResponses from '../HttpResponses'
import { InvalidParamError, InvalidDateError, MissingParamError } from '../errors'

const dateValidator = (prazo: string) => {
  if (typeof (prazo) !== 'string') throw HttpResponses.badRequest(new InvalidParamError('prazo'))

  const now = moment()
  const dataPrazo = moment(prazo)

  if (dataPrazo < now) {
    throw HttpResponses.badRequest(new InvalidParamError('prazo'))
  }

  const data = dataPrazo.format('YYYY-MM-DD HH:mm:ss')
  if (data == 'Invalid date') throw HttpResponses.badRequest(new InvalidDateError())

  return data
}
export default dateValidator
