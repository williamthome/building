import { PhaseModel } from '@/data/models'

export interface DeletePhaseProjectsRepository {
  deletePhaseProjects: (id: PhaseModel['id']) => Promise<number>
}