export class UnauthenticatedError extends Error {
  constructor() {
    super('Unauthenticated user')
  }
}
