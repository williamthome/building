/********************************************/
/* BRAINSTORM
/********************************************/

export type Result<Type, Failure> = {
  kind: 'ok' | 'error',
  code: number,
  result?: Type | Failure
}

export interface UseCase<T> {
  call: (...args: never[]) => Promise<Result<T, Error>>
}

export enum HttpStatusCode {
  OK = 200
}

export interface HttpResponse<T = never> {
  statusCode: HttpStatusCode
  body: T
}

export enum HttpHeaderName {
  AUTHORIZATION = 'Authorization'
}

export type HttpHeaders = Partial<Record<HttpHeaderName, string>>

export type HttpParameters = Record<string, string>

export interface HttpRequest<T = never> {
  body?: T
  headers?: HttpHeaders
  params?: HttpParameters
}

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

export interface LogControllerDecorator extends Controller {
  controller: Controller
}

export interface Route {
  path: string
  controller: Controller
  requirement: 'admin' | 'auth' | 'master' | 'none'
  permissions?: number
}

export interface Database {
  connect: (url: string) => Promise<void>
  disconnect: () => Promise<void>
}

export interface Server {
  db: Database
  routes: Route[]
  run: (dbUrl: string) => Promise<void>
}

/********************************************/
/* TESTS
/********************************************/

interface User {
  name: string
  address: string
}

class Test implements UseCase<User> {
  call = async (name: string, address: string): Promise<Result<User, Error>> => {
    return new Promise(resolve => {
      resolve({
        kind: 'ok',
        code: 200,
        result: {
          name: name,
          address: address
        }
      })
    })
  }
}

const t = new Test()
t.call('William', 'Tunápolis')