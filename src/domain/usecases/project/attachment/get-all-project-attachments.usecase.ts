import { Project } from '@/domain/entities'
import { FileEntityResponse } from '@/domain/protocols'

export interface GetAllProjectAttachmentsUseCase {
  call: (projectId: Project['id']) => Promise<FileEntityResponse[] | null>
}
