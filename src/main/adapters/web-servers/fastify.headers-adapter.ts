import { FastifyRequest } from 'fastify'
import { HttpHeaders } from '@/presentation/protocols'

export const adaptHttpHeadersToFastify = (req: FastifyRequest): HttpHeaders => {
  const headers: HttpHeaders = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (key && value) {
      if (typeof value === 'string') {
        headers[key] = value
      } else {
        for (const v of value) {
          headers[key] = v
        }
      }
    }
  }
  return headers
}