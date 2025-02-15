import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { UsersRepository } from '@/repositories/users-repository'
import { AuthenticateService } from '@/services/authenticate-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new UsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    const { user } = await authenticateService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({}, { sign: { sub: user.id } })

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
