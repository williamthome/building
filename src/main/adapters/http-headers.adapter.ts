import { HttpHeaders } from '@/presentation/protocols'

export interface HttpHeadersAdapter<Req> {
  adaptHttpHeaders: (req: Req) => HttpHeaders
}