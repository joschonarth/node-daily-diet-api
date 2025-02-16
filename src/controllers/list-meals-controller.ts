import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'

export async function listMeals(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user?.sub

  const mealsRepository = new MealsRepository()

  const meals = await mealsRepository.findAll(userId)

  return reply.status(200).send(meals)
}
