import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { mealUpdateBodySchema } from '@/schemas/meal-update-body-schema'
import { NotFoundError } from '@/errors/not-found-error'
import { ForbiddenError } from '@/errors/forbidden-error'
import { MealsParamsInterface } from '@/interfaces/meals-params-interface'

export async function updateMeal(
  request: FastifyRequest<{ Params: MealsParamsInterface }>,
  reply: FastifyReply,
) {
  const { name, description, date, inDiet } = mealUpdateBodySchema.parse(
    request.body,
  )
  const mealId = request.params.id

  try {
    const userId = request.user?.sub

    const mealsRepository = new MealsRepository()

    const meal = await mealsRepository.findById(mealId)

    if (!meal) {
      throw new NotFoundError('Meal not found', 404)
    }

    if (meal.userId !== userId) {
      throw new ForbiddenError('You do not have permission to update this meal')
    }

    const updatedDate = date ? new Date(date) : meal.dateTime

    const updatedMeal = await mealsRepository.update(mealId, {
      name,
      description,
      dateTime: updatedDate,
      inDiet,
    })

    return reply.status(200).send(updatedMeal)
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
