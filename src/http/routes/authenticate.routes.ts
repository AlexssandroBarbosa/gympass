import { FastifyInstance } from 'fastify'
import { signIn } from '../controller/authenticate.controller'

export const authenticateRoutes = async (app: FastifyInstance) => {
  app.post('/', signIn)
}
