import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExist } from './errors/user-already-exist-error'

interface UserStoreUseCaseRequest {
  name: string
  email: string
  password: string
}

interface UserStoreUseCaseResponse {
  user: User
}

export class UserRegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: UserStoreUseCaseRequest): Promise<UserStoreUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExist()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
