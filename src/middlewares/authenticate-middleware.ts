import { InvalidTokenError } from '@/errors/invalid-token-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticateMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
    request.user = { sub: request.user.sub }
  } catch (err) {
    if (err instanceof InvalidTokenError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }
}
