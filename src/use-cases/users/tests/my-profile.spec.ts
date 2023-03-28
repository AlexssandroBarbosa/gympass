import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { UserDoesNotExist } from '../errors/user-not-exist-error'
import { MyProfileUseCase } from '../my-profile'

let userRepository: InMemoryUsersRepository
let sut: MyProfileUseCase

describe('Get User Profile Tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new MyProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await sut.execute({
      userId: user.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(UserDoesNotExist)
  })
})
