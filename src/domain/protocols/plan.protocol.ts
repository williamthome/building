export interface PlanLimits {
  member: number
  customer: number
  property: number
  technician: number
  building: number
  phase: number
  project: number
  storage: number
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