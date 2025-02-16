import { addMeal } from '@/controllers/add-meal-controller'
import { getMeal } from '@/controllers/get-meal-controller'
import { listMeals } from '@/controllers/list-meals-controller'
import { deleteMeal } from '@/controllers/remove-meal-controller'
import { summary } from '@/controllers/summary-controller'
import { updateMeal } from '@/controllers/update-meal-controller'
import { authenticateMiddleware } from '@/middlewares/authenticate-middleware'
import { FastifyInstance } from 'fastify'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticateMiddleware)

  app.post('/', addMeal)
  app.put('/:id', updateMeal)
  app.delete('/:id', deleteMeal)
  app.get('/', listMeals)
  app.get('/:id', getMeal)
  app.get('/summary', summary)
}
