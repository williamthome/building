import 'module-alias/register'
import { MongoDB } from './infra/db/mongo/mongo.db'
import { Fastify } from './main/web-servers/fastify/fastify.web-server'
import { Application } from './main/app'

// Vars
const port = parseInt(process.env.PORT ?? '5050')
const dbUrl = process.env.DB_URL ?? 'MONGO_URL'

// Create 3rd party dependencies
const webServer = new Fastify(port)
const db = new MongoDB(dbUrl)

// Create app and inject dependencies
const app = new Application(webServer, db)

// Run app
console.log('App starting')
app.run().then(() => {
  console.log('App is running')
}).catch((error) => {
  console.error(error)
})