import 'module-alias/register'
import 'reflect-metadata'
import injector from './shared/dependency-injection/injector/injector'
import { App, WebServer } from './main/protocols'
import { Fastify } from './main/web-servers/fastify/fastify.web-server'
import { Database } from './infra/protocols/database.protocol'
import { MongoDB } from './infra/db/mongo/mongo.db'
import { Application } from './main/app'

let app: App

const run = async (): Promise<void> => {
  const port = 5050
  const dbUrl = 'mongodb://localhost:27001,localhost:27002,localhost:27003/building'

  console.log('-------------------------------------------------')

  injector.registers.set('port', port)
  injector.registers.set('dbUrl', dbUrl)

  injector.registers.set('webServer', Fastify)
  const webServer = injector.resolve<WebServer>(Fastify)

  injector.registers.set('db', MongoDB)
  const db = injector.resolve<Database>(MongoDB)

  console.log('-------------------------------------------------')

  app = new Application(webServer, db)
  injector.registers.set('app', app)

  await app.run()
}

run().catch((error) => {
  console.error(error)
}).finally(() => {
  bindProcessEvents()
})

const bindProcessEvents = (): void => {
  process.on('SIGINT', () => {
    cleanUpServer().then(() => {
      process.exit(0)
    })
  })
}

const cleanUpServer = async (): Promise<void> => {
  if (app.isHealthy()) {
    await app.stop()
  }
  console.warn('Server closed through app termination')
}