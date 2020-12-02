export type PlanLimit =
  | 'unlimited'
  | {
    member: number
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