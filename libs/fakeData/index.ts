import faker from 'faker'

// see: https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#

export default {
  entity: {
    id: (): string => faker.random.uuid()
  },
  person: {
    fullName: (): string => faker.name.findName()
  },
  address: {
    full: (): string => faker.address.streetAddress(true)
  }
}