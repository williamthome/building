import { File } from '@/domain/entities'

export interface GetFilesByReferenceIdUseCase {
  call: (id: string) => Promise<File[]>
}