import { HttpHeaders } from '../protocols'

export interface HttpHeadersAdapter<Req> {
  adaptHttpHeaders: (req: Req) => HttpHeaders
}