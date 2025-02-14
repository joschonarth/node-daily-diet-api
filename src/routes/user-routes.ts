import { register } from '@/controllers/register-controller'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', register)
}
