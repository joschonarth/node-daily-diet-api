import { addMeal } from '@/controllers/add-meal-controller'
import { authenticateMiddleware } from '@/middlewares/authenticate-middleware'
import { FastifyInstance } from 'fastify'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: authenticateMiddleware }, addMeal)
}
