import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/authenticate/errors/invalid-credentials-error'
import { makeSignInUseCase } from '@/use-cases/factories/make-sign-in-use-case'

export const signIn = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authenticateBodySchema = z.object({
      email: z.string(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    const signInUseCase = makeSignInUseCase()

    await signInUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
