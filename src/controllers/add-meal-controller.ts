import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { MealsRepository } from '@/repositories/meals-repository'
import { UserNotFoundError } from '@/errors/user-not-found-error'
import { UnauthenticatedError } from '@/errors/unauthenticated-error'

export async function addMeal(request: FastifyRequest, reply: FastifyReply) {
  const mealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Data inválida',
      })
      .optional(),
    inDiet: z.boolean(),
  })

  const { name, description, date, inDiet } = mealBodySchema.parse(request.body)

  try {
    const userId = request.user?.sub

    if (!userId) {
      throw new UnauthenticatedError()
    }

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
