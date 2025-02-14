import fastify from 'fastify'
import { userRoutes } from './routes/user-routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(userRoutes, { prefix: '/users' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
