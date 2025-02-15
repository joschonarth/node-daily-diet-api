export class NotFoundError extends Error {
  statusCode: number

  constructor(
    message: string = 'Resource not found',
    statusCode: number = 404,
  ) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
  }
}
