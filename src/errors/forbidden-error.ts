export class ForbiddenError extends Error {
  statusCode: number

  constructor(
    message: string = 'You do not have permission to access this resource',
  ) {
    super(message)
    this.statusCode = 403
    this.name = 'ForbiddenError'
  }
}
