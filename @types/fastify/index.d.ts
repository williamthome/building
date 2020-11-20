import fastify from 'fastify'
import { LoggedUserInfo } from '../../src/presentation/protocols'

declare module 'fastify' {
  export interface FastifyRequest<
    RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>
    > {
    loggedUserInfo: LoggedUserInfo
  }
}