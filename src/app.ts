import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

// Routes
import { userRoutes } from '@/http/routes/user.routes'
import { authenticateRoutes } from './http/routes/authenticate.routes'

export const app = fastify()

app.register(authenticateRoutes, {
  prefix: '/api/gympass/sessions',
})

app.register(userRoutes, {
  prefix: '/api/gympass/users',
})

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: here we
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
