import { Technician, CreateTechnicianDto, UpdateTechnicianDto } from '@/domain/entities'

export type TechnicianData = Technician

export type CreateTechnicianData = CreateTechnicianDto & Pick<TechnicianData, 'companyId'>

export type UpdateTechnicianData = UpdateTechnicianDto