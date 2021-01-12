import { CollectionName } from '@/shared/types'

type PlanLimitFields =
  | 'member'
  | 'customer'
  | 'property'
  | 'technician'
  | 'building'
  | 'phase'
  | 'project'
  | 'storageMb'

type PlanValueFields = 'BRL' | 'USD'

export type PlanLimits = { [K in PlanLimitFields]: number }

export type PlanValues = { [K in PlanValueFields]: number }

export type PlanLimit = 'unlimited' | PlanLimits

export type PlanValue = 'free' | PlanValues

type PlanLimitCollectionName = { [K in PlanLimitFields]: CollectionName | 'members' }

export const planLimitCollectionName: PlanLimitCollectionName = {
  member: 'members',
  customer: 'customers',
  property: 'properties',
  technician: 'technicians',
  building: 'buildings',
  phase: 'phases',
  project: 'projects',
  storageMb: 'files'
}
