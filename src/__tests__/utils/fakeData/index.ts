import faker from 'faker'

// see: https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#

export default {
  entity: {
    id: (): string => faker.random.uuid(),
    password: (): string => faker.random.uuid(),
  },
  person: {
    fullName: (): string => faker.name.findName()
  },
  address: {
    street: (): string => faker.address.streetName(),
    city: (): string => faker.address.city(),
    state: (): string => faker.address.stateAbbr(),
    full: (): string => faker.address.streetAddress(true)
  }
}