import { Entity } from '../protocols'

export interface LogErrorEntity extends Entity {
  stack: Error['stack']
  date: Date
}