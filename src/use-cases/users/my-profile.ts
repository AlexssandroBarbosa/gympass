import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'
import { UserDoesNotExist } from './errors/user-not-exist-error'

interface MyProfileUseCaseRequest {
  userId: string
}

interface MyProfileUseCaseResponse {
  user: User
}

export class MyProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: MyProfileUseCaseRequest): Promise<MyProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserDoesNotExist()
    }

    return {
      user,
    }
  }
}
