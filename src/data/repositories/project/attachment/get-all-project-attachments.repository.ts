import { FileModel, ProjectModel } from '@/data/models'

export interface GetAllProjectAttachmentsRepository {
  getAllProjectAttachments: (
    projectId: ProjectModel['id']
  ) => Promise<FileModel[] | null>
}