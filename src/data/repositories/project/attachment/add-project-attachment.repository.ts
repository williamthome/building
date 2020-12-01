import { FileModel, ProjectModel } from '@/data/models'
import { FileModelDto } from '@/data/protocols'

export interface AddProjectAttachmentRepository {
  addProjectAttachment: (
    projectId: ProjectModel['id'],
    fileDto: FileModelDto
  ) => Promise<FileModel>
}