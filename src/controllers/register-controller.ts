import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterService } from '@/services/register-service'
import { UsersRepository } from '@/repositories/users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { username, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new UsersRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.execute({
      username,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
