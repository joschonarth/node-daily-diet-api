import { UsersRepositoryInterface } from '@/interfaces/users-repository-interface'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class UsersRepository implements UsersRepositoryInterface {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
