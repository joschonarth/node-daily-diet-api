import { UsersRepository } from '@/repositories/users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import z from 'zod'
import { prisma } from '@/lib/prisma'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { username, email, password } = registerBodySchema.parse(request.body)

  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  const usersRepository = new UsersRepository()

  await usersRepository.create({
    username,
    email,
    password: passwordHash,
  })

  return reply.status(201).send()
}
