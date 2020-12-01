import { ProjectEntity } from '@/domain/entities'
import { FileResponse } from '@/domain/protocols'

export interface GetAllProjectAttachmentsUseCase {
  call: (
    projectId: ProjectEntity['id']
  ) => Promise<FileResponse[] | null>
}