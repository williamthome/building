import { CollectionName } from '@/shared/types'

export interface PlanLimits {
  member: number
  customer: number
  property: number
  technician: number
  building: number
  phase: number
  project: number
  storageMb: number
}

export interface PlanValues {
  BRL: number
  USD: number
}

export type PlanLimit =
  | 'unlimited'
  | PlanLimits

export type PlanValue =
  | 'free'
  | PlanValues

type PlanLimitCollectionName = { [K in keyof Required<PlanLimits>]: CollectionName | 'members' }

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