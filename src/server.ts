import 'module-alias/register'
import dinjector from './shared/libs/dinjector/dinjector'
import { App, WebServer } from './main/protocols'
import { Fastify } from './main/web-servers/fastify/fastify.web-server'
import { Database } from './infra/protocols/database.protocol'
import { MongoDB } from './infra/db/mongo/mongo.db'
import { Application } from './main/app'
import { AddUserContract } from './data/contracts/user/add-user.contract'
import { UserMongoRepository } from './infra/db/mongo/repositories/user.mongo-repository'

let app: App

const run = async (): Promise<void> => {
  dinjector.setValue('PORT', 5050)
  dinjector.setValue('DB_URL', 'mongodb://localhost:27001,localhost:27002,localhost:27003/building')

  dinjector.setValue('addUserRepository', UserMongoRepository)
  dinjector.setValue('addUserUseCase', AddUserContract)

  await dinjector.resolve<WebServer>(Fastify)
  await dinjector.resolve<Database>(MongoDB)
  app = await dinjector.resolve<App>(Application)

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