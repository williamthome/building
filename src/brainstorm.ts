/********************************************/
/* BRAINSTORM
/********************************************/

import { Route } from './presentation/protocols/route.protocol'

export interface Database {
  connect: (url: string) => Promise<void>
  disconnect: () => Promise<void>
}

export interface Server {
  db: Database
  routes: Array<Route<unknown>>
  run: (dbUrl: string) => Promise<void>
}

/********************************************/
/* TESTS
/********************************************/

/*
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
*/