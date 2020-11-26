import { ProjectEntity } from '../entities'

export type ProjectDto = Partial<Omit<ProjectEntity, 'id' | 'companyId'>>