import { addMeal } from '@/controllers/add-meal-controller'
import { updateMeal } from '@/controllers/update-meal-controller'
import { authenticateMiddleware } from '@/middlewares/authenticate-middleware'
import { FastifyInstance } from 'fastify'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticateMiddleware)

  app.post('/', addMeal)
  app.put('/:id', updateMeal)
}
