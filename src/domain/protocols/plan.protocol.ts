export type PlanLimit =
  | 'unlimited'
  | {
    member: number
    customer: number
    property: number
    technician: number
    building: number
    phase: number
    project: number
    storage: number
  }

export type PlanValue =
  | 'free'
  | {
    BRL: number
    USD: number
  }