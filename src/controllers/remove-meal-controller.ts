import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { NotFoundError } from '@/errors/not-found-error'
import { ForbiddenError } from '@/errors/forbidden-error'
import { MealsParamsInterface } from '@/interfaces/meals-params-interface'

export async function deleteMeal(
  request: FastifyRequest<{ Params: MealsParamsInterface }>,
  reply: FastifyReply,
) {
  const mealId = request.params.id

  const userId = request.user?.sub

  const mealsRepository = new MealsRepository()

  const meal = await mealsRepository.findById(mealId)

  if (!meal) {
    throw new NotFoundError('Meal not found', 404)
  }

  if (meal.userId !== userId) {
    throw new ForbiddenError('You do not have permission to delete this meal')
  }

  await mealsRepository.delete(mealId)

  return reply.status(200).send({ message: 'Meal deleted successfully' })
}
