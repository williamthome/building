import { ObjectChange } from './object-change'

export interface ObjectComparison {
  added: Record<string, any>
  updated: Record<string, ObjectChange>
  removed: Record<string, any>
  unchanged: Record<string, any>
  equals: boolean
}