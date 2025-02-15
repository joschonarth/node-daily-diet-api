import { authenticate } from '@/controllers/authenticate-controller'
import { register } from '@/controllers/register-controller'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
