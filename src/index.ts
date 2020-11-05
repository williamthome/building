import 'module-alias/register'
import { Server } from './main/server'

new Server().config(async server => {
  await server.run()
}).catch(error => {
  console.error(error)
})