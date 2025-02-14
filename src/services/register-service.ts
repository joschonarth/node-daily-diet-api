import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  username: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: any) {}

  async execute({ username, email, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    await this.usersRepository.create({
      username,
      email,
      password: passwordHash,
    })
  }
}
