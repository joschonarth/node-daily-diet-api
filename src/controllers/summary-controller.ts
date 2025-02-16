import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { prisma } from '@/lib/prisma'
import { UserNotFoundError } from '@/errors/user-not-found-error'

export async function summary(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userId = request.user?.sub

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new UserNotFoundError()
    }

    const mealsRepository = new MealsRepository()
    const summary = await mealsRepository.getSummary(userId)

    return reply.status(200).send(summary)
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
