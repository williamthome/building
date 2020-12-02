import { Inject, Injectable } from '@/shared/dependency-injection'
import { PhaseModel, ProjectModel } from '@/data/models'
import { DeletePhaseProjectsRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'

@Injectable('deletePhaseProjectsRepository')
export class DbDeletePhaseProjectsRepository implements DeletePhaseProjectsRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  deletePhaseProjects = async (phaseId: PhaseModel['id']): Promise<number> => {
    return await this.db.deleteMany<ProjectModel, 'phaseId'>('phaseId', phaseId, 'projects')
  }
}