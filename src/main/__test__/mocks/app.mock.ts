import { MongoDB } from '@/infra/db/mongo/mongo.db'
import { Application } from '@/main/app'
import { Fastify } from '@/main/web-servers/fastify/fastify.web-server'

export const mockApp = (port = 9200, dbUrl = 'dbUrl'): Application => {
  const webServer = new Fastify(port)
  const db = new MongoDB(dbUrl)
  return new Application(webServer, db)
}