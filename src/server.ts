import 'module-alias/register'
import 'reflect-metadata'
import { container } from './shared/dependency-injection/libs/tsyringe/tsyringe'
import { App, WebServer } from './main/protocols'
import { Fastify } from './main/web-servers/fastify/fastify.web-server'
import { Database } from './infra/protocols/database.protocol'
import { MongoDB } from './infra/db/mongo/mongo.db'
import { Application } from './main/app'

const run = async (): Promise<void> => {
  const port = 5050
  const dbUrl = 'mongodb://localhost:27001,localhost:27002,localhost:27003/building'

  console.log('-------------------------------------------------')

  container.registerProperty('PORT', port)
  container.registerProperty('DB_URL', dbUrl)

  console.log('-------------------------------------------------')

  await import('@/main/web-servers/fastify/fastify.web-server')
  await import('@/infra/db/mongo/mongo.db')
  await import('@/main/app')

  console.log('-------------------------------------------------')

  container.registerProperty('WEB_SERVER', new Fastify(port))
  const webServer = container.resolve<WebServer>('WEB_SERVER')

  console.log('-------------------------------------------------')

  container.registerProperty('DB', new MongoDB(dbUrl))
  const db = container.resolve<Database>('DB')

  console.log('-------------------------------------------------')

  container.registerProperty('APP', new Application(webServer, db))
  const app = container.resolve<App>('APP')

  console.log('-------------------------------------------------')

  await app.run()
}

run().catch((error) => {
  console.error(error)
})