import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from '../create'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia Pro3',
      description: 'A academia mais tecnologica da região do tatuapé!',
      phone: '11953813323',
      latitude: -23.5500645,
      longitude: -46.5715598,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
