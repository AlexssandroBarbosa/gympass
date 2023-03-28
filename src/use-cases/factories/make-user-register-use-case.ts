import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserRegisterUseCase } from '../users/register'

export function makeUserRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const userRegisterUseCase = new UserRegisterUseCase(usersRepository)

  return userRegisterUseCase
}
