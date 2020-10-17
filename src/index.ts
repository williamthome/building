import 'module-alias/register'
import { Application } from './main/app'
import { Fastify } from './main/web-servers/fastify/fastify.web-server'
import { MongoDB } from './infra/db/mongo/mongo.db'

// Vars
const port = parseInt(process.env.PORT || '5050')
const dbUrl = process.env.DB_URL || 'MONGO_URL'

// Create 3rd party dependencies
const webServer = new Fastify(port)
const db = new MongoDB(dbUrl)

// Create app and inject dependencies
const app = new Application(webServer, db)

app.run().catch((error) => {
  console.error(error)
})