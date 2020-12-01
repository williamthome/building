import { FileEntity } from '@/domain/entities'

export interface GetFileByIdUseCase {
  call: (id: FileEntity['id']) => Promise<FileEntity | null>
}