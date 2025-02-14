import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepositoryInterface } from '@/interfaces/users-repository-interface'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  username: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({ username, email, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      username,
      email,
      password: passwordHash,
    })
  }
}
