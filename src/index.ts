import { Server } from '@/main/server'

const server = new Server()
server.listen().catch((error) => {
  server.close()
  console.error(error)
})