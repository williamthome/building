import faker from 'faker'
import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/data/adapters'
import { PlanEntity } from '@/domain/entities'

// see: https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#

const unlimitedPlanId = faker.random.uuid()

export default {
  entity: {
    id: (): string => faker.random.uuid(),
    password: (): string => faker.random.uuid(),
    token: (value: string, secret = 'tokenSecret'): string => jwt.sign({ [JwtAdapter.key]: value }, secret),
    jwtSecret: (): string => faker.random.word()
  },
  person: {
    fullName: (): string => faker.name.findName(),
    email: (): string => faker.internet.email()
  },
  address: {
    street: (): string => faker.address.streetName(),
    city: (): string => faker.address.city(),
    state: (): string => faker.address.stateAbbr(),
    full: (): string => faker.address.streetAddress(true)
  },
  random: {
    word: (): string => faker.random.word()
  },
  plans: {
    unlimited: (): PlanEntity => ({
      id: unlimitedPlanId,
      limit: 'unlimited',
      value: 'free'
    })
  }
}