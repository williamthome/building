import { ProjectStatus } from '@/shared/constants'
import { OmitKey } from '@/shared/types'
import { ExtractDto, ExtractEntity, ExtractUpdateDto, limitedEntitySchema } from '../protocols/entity.protocol'
import { string, number } from '../protocols/schema'
import { CreateFileDto } from './file.entity'

export const projectSchema = limitedEntitySchema({
  buildingId: string().required(),
  phaseId: string().required(),
  title: string().required(),
  status: number<ProjectStatus>()
})

export type Project = ExtractEntity<typeof projectSchema>

export type CreateProjectDto = ExtractDto<typeof projectSchema>

export type UpdateProjectDto = ExtractUpdateDto<typeof projectSchema, 'buildingId' | 'phaseId'>

export type UploadProjectAttachmentDto = OmitKey<CreateFileDto, 'reference'>