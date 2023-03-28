import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '../check-in'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In tests', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gaviões Gym',
      description: null,
      phone: null,
      latitude: new Decimal(-23.5372544),
      longitude: new Decimal(-46.4027648),
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'Pro3 Gym',
      description: null,
      phone: null,
      latitude: new Decimal(-23.5454464),
      longitude: new Decimal(-46.4375315),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to create check-in!', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 30, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5372544,
      userLongitude: -46.4027648,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day!', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 30, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5372544,
      userLongitude: -46.4027648,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -23.5372544,
        userLongitude: -46.4027648,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('Should not be able to check in twice but in the same day!', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 20, 59, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5372544,
      userLongitude: -46.4027648,
    })

    vi.setSystemTime(new Date(2023, 0, 2, 20, 59, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -23.5372544,
      userLongitude: -46.4027648,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    vi.setSystemTime(new Date(2023, 1, 1, 10, 30, 0))

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -23.5372544,
        userLongitude: -46.4027648,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
