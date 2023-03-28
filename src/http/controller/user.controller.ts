import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExist } from '@/use-cases/users/errors/user-already-exist-error'
import { makeUserRegisterUseCase } from '@/use-cases/factories/make-user-register-use-case'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const requestBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
    })

    const { name, email, password } = requestBodySchema.parse(request.body)

    const userRegisterUseCase = makeUserRegisterUseCase()

    const user = await userRegisterUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send(user)
  } catch (err) {
    if (err instanceof UserAlreadyExist) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
