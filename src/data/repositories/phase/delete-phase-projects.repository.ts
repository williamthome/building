import { PhaseData } from '@/data/models'

export interface DeletePhaseProjectsRepository {
  deletePhaseProjects: (id: PhaseData['id']) => Promise<number>
}