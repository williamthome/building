import { FileData, ProjectData } from '@/data/models'

export interface GetAllProjectAttachmentsRepository {
  getAllProjectAttachments: (id: ProjectData['id']) => Promise<FileData[] | null>
}
