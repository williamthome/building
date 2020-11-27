import { AddressEntity } from '@/domain/entities/nested'

export class AddressModel implements AddressEntity {
  constructor (
    public readonly street?: string,
    public readonly city?: string,
    public readonly state?: string
  ) { }
}