import { User, Prisma } from '@prisma/client'

export interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
