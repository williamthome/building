import { Inject, Injectable } from '@/shared/dependency-injection'
import { PhaseModel } from '@/data/models'
import { AddPhaseRepository } from '@/data/repositories'
import { Database } from '@/infra/protocols'
import { PhaseModelDto } from '@/data/protocols'

@Injectable('addPhaseRepository')
export class DbAddPhaseRepository implements AddPhaseRepository {
  constructor (
    @Inject('db') private readonly db: Database
  ) {}

  addPhase = async (phaseDto: PhaseModelDto): Promise<PhaseModel> => {
    return await this.db.addOne<PhaseModel>(phaseDto, 'phases')
  }
}