import { FastifyReply, FastifyRequest } from 'fastify'

interface JwtError {
  code: string
  message: string
}

function isJwtError(err: unknown): err is JwtError {
  return (
    (err as JwtError)?.code !== undefined &&
    (err as JwtError)?.message !== undefined
  )
}

export async function authenticateMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
    request.user = { sub: request.user.sub }
  } catch (err: unknown) {
    if (isJwtError(err)) {
      switch (err.code) {
        case 'FST_JWT_NO_AUTHORIZATION_IN_HEADER':
          return reply.status(401).send({ message: err.message })
        case 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED':
          return reply.status(401).send({ message: err.message })
        case 'FST_JWT_AUTHORIZATION_TOKEN_INVALID':
          return reply.status(401).send({ message: err.message })
        default:
          return reply.status(401).send({ message: err.message })
      }
    }

    throw err
  }
}
