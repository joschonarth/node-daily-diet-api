import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { NotFoundError } from '@/errors/not-found-error'
import { ForbiddenError } from '@/errors/forbidden-error'
import { MealsParamsInterface } from '@/interfaces/meals-params-interface'

export async function deleteMeal(
  request: FastifyRequest<{ Params: MealsParamsInterface }>,
  reply: FastifyReply,
) {
  const mealId = request.params.id

  try {
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
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
