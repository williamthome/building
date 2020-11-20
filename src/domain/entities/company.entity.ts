import { Entity } from '../protocols'
import { Member } from './nested'

export interface CompanyEntity extends Entity {
  name: string
  members: Member[]
}