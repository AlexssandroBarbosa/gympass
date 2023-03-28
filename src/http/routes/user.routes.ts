import { FastifyInstance } from 'fastify'
import { register } from '../controller/user.controller'

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/', register)
}
