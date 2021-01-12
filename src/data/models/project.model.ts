import {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
  UploadProjectAttachmentDto
} from '@/domain/entities'

export type ProjectData = Project

export type CreateProjectData = CreateProjectDto & Pick<ProjectData, 'companyId'>

export type UpdateProjectData = UpdateProjectDto

export type UploadProjectAttachmentData = UploadProjectAttachmentDto
