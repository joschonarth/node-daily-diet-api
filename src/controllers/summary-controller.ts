import { FastifyReply, FastifyRequest } from 'fastify'
import { MealsRepository } from '@/repositories/meals-repository'
import { prisma } from '@/lib/prisma'
import { NotFoundError } from '@/errors/not-found-error'

export async function summary(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user?.sub

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const mealsRepository = new MealsRepository()
  const summary = await mealsRepository.getSummary(userId)

  return reply.status(200).send(summary)
}
