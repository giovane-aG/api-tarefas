import { ServerError } from './errors'

class HttpResponses {
  static badRequest (error: any) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static ok (data: any) {
    return {
      statusCode: 200,
      body: data
    }
  }

  static created (data: any) {
    return {
      statusCode: 201,
      body: data
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }
}

export default HttpResponses
