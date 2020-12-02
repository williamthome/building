import { Inject, Injectable } from '@/shared/dependency-injection'
import { PhaseModel } from '@/data/models'
import { UpdatePhaseRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { PhaseModelDto } from '@/data/protocols'

@Injectable('updatePhaseRepository')
export class DbUpdatePhaseRepository implements UpdatePhaseRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  updatePhase = async (
    phaseId: PhaseModel['id'],
    phaseDto: PhaseModelDto
  ): Promise<PhaseModel | null> => {
    return await this.db.updateOne<PhaseModel>(phaseId, phaseDto, 'phases')
  }
}