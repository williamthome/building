import 'module-alias/register'
import { Server } from './main/server'

new Server().config().then(async server => {
  await server.run()
}).catch(error => {
  console.error(error)
})