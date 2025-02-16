import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { UnauthenticatedError } from '@/errors/unauthenticated-error'

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user?.sub

    if (!userId) {
      throw new UnauthenticatedError()
    }

    const mealsRepository = new MealsRepository()

    const meals = await mealsRepository.findAll(userId)

    return reply.status(200).send(meals)
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
