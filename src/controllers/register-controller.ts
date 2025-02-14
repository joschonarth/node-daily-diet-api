import { UsersRepository } from '@/repositories/users-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { username, email, password } = registerBodySchema.parse(request.body)

  const usersRepository = new UsersRepository()

  await usersRepository.create({
    username,
    email,
    password,
  })

  return reply.status(201).send()
}
