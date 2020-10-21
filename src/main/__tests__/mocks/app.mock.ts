import { MongoDB } from '@/infra/db/mongo/mongo.db'
import { Application } from '@/main/app'
import { App } from '@/main/protocols'
import { Fastify } from '@/main/web-servers/fastify/fastify.web-server'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const mockApp = (
  port = 9200,
  dbUrl = 'mongodb://localhost:27001,localhost:27002,localhost:27003/building'
): App => {
  const webServer = new Fastify(port)
  const db = new MongoDB(dbUrl)
  return new Application(webServer, db)
}