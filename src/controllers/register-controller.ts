import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterService } from '@/services/register-service'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'

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
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
