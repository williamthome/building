import { ProjectStatus } from '@/shared/constants'
import { OmitKey } from '@/shared/types'
import { ExtractDto, ExtractEntity, ExtractUpdateDto, limitedEntitySchema } from '../protocols/entity.protocol'
import { string, number, array } from '../protocols/schema'
import { CreateFileDto } from './file.entity'

export const projectSchema = limitedEntitySchema({
  buildingId: string().required(),
  phaseId: string().required(),
  participantIds: array<string>().required().minSize(1),
  title: string().required(),
  status: number<ProjectStatus>()
})

export type Project = ExtractEntity<typeof projectSchema>

export type CreateProjectDto = ExtractDto<typeof projectSchema>

export type UpdateProjectDto = ExtractUpdateDto<typeof projectSchema, 'buildingId' | 'phaseId'>

export type UploadProjectAttachmentDto = OmitKey<CreateFileDto, 'reference'>