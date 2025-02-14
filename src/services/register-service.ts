import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  username: string
  email: string
  password: string
}

export async function registerService({
  username,
  email,
  password,
}: RegisterServiceRequest) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }

  const usersRepository = new UsersRepository()

  await usersRepository.create({
    username,
    email,
    password: passwordHash,
  })
}
