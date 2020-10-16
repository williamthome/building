import { MongoDB } from './infra/db/mongo/mongo.db'
import { Application } from './main/app'

const dbUrl = 'MONGO_URL'
const db = new MongoDB(dbUrl)
const app = new Application(db)

app.run().then(() => {
  console.log('App is running')
}).catch((error) => {
  console.error(error)
})