import { Middleware } from './middleware.protocol'
import { Controller, HttpMethod, HttpParameters, HttpQuery } from '@/presentation/protocols'

export type RouteOptions = Pick<RoutePath, 'method' | 'urn'>

export interface Route<TRequest, TResponse = TRequest> {
  path?: RoutePath
  controller: Controller<TRequest, TResponse>
  middlewares: Middleware[]
}

export class RoutePath {
  // parameters: string[]

  constructor (
    public readonly method: HttpMethod,
    public readonly urn: string
  ) {
    // this.parameters = this.urn.match(/(?<=:)([^/]+)(?=\/*)/g) || []
  }

  get describe (): string { return `${this.urn} ${this.method}` }

  fillURN = (): FillRoutePath => new FillRoutePath(this.urn)
}

class FillRoutePath {
  constructor (private readonly urn: RoutePath['urn']) { }

  params = (params: HttpParameters): FillRoutePathQuery =>
    new FillRoutePathParameters(this.urn).params(params)

  query = (query: HttpQuery): string =>
    new FillRoutePathQuery(this.urn).query(query)
}

class FillRoutePathParameters {
  constructor (private readonly urn: RoutePath['urn']) { }
  params = (params: HttpParameters): FillRoutePathQuery => {
    let urn = this.urn
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        urn = urn.replace(`:${key}`, value)
      }
    }
    return new FillRoutePathQuery(urn)
  }
}
class FillRoutePathQuery {
  constructor (public readonly urn: RoutePath['urn']) { }
  query = (query: HttpQuery): string => {
    let urn = `${this.urn}?`
    const queryEntries = Object.entries(query)
    const queryKeys = Object.keys(query)
    for (const [key, value] of queryEntries) {
      urn = `${urn}${key}=${value}${queryKeys.indexOf(key) !== queryEntries.length - 1 ? '&' : ''}`
    }
    return urn
  }
}