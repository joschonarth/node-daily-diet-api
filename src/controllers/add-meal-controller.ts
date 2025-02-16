import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { mealBodySchema } from '@/schemas/meal-body-schema'

export async function addMeal(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, date, inDiet } = mealBodySchema.parse(request.body)

  try {
    const userId = request.user?.sub

    const dateTime = date ? new Date(date) : new Date()

    const mealsRepository = new MealsRepository()

    await mealsRepository.create({
      name,
      description,
      dateTime,
      inDiet,
      user: { connect: { id: userId } },
    })
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
