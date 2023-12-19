import cors from '@fastify/cors'
import fastify from 'fastify'
import { appRoutes } from './appRoutes'

const app = fastify()

app.register(cors)

app.register(appRoutes)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on port 3333!')
  })
