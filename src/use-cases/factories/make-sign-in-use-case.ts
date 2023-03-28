import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SignInUseCase } from '../authenticate/sign-in'

export function makeSignInUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const signInUseCase = new SignInUseCase(usersRepository)

  return signInUseCase
}
