import { ProjectEntity } from '@/domain/entities'
import { FileEntityResponse } from '@/domain/protocols'

export interface GetAllProjectAttachmentsUseCase {
  call: (
    projectId: ProjectEntity['id']
  ) => Promise<FileEntityResponse[] | null>
}