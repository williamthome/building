import { Phase, CreatePhaseDto, UpdatePhaseDto } from '@/domain/entities'

export type PhaseData = Phase

export type CreatePhaseData = CreatePhaseDto & Pick<PhaseData, 'companyId'>

export type UpdatePhaseData = UpdatePhaseDto
