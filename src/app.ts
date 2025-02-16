import fastify from 'fastify'
import { userRoutes } from './routes/user-routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { mealRoutes } from './routes/meal-routes'
import { jwtMessages } from './configs/jwt-messages'
import { ForbiddenError } from './errors/forbidden-error'
import { NotFoundError } from './errors/not-found-error'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  messages: jwtMessages,
})

app.register(userRoutes)
app.register(mealRoutes, { prefix: 'meals' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (error instanceof ForbiddenError) {
    return reply.status(403).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
