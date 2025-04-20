import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { mealBodySchema } from '@/schemas/meal-body-schema'

export async function addMeal(request: FastifyRequest, reply: FastifyReply) {
  const { name, description, date, inDiet } = mealBodySchema.parse(request.body)

  const userId = request.user?.sub

  const dateTime = date ? new Date(date) : new Date()

  const mealsRepository = new MealsRepository()

  const meal = await mealsRepository.create({
    name,
    description,
    dateTime,
    inDiet,
    user: { connect: { id: userId } },
  })

  return reply.status(201).send(meal)
}
