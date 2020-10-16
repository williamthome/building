import { MongoDB } from './infra/db/mongo/mongo.db'
import { Application } from './main/app'
import { Fastify } from './main/web-servers/fastify.web-server'

const port = 5050
const webServer = new Fastify(port)
const dbUrl = 'MONGO_URL'
const db = new MongoDB(dbUrl)
const app = new Application(webServer, db)

app.run().then(() => {
  console.log('App is running')
}).catch((error) => {
  console.error(error)
})