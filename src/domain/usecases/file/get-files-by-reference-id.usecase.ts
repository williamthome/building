import { Entity } from '@/domain/protocols'
import { FileEntity } from '@/domain/entities'

export interface GetFilesByReferenceIdUseCase {
  call: (id: Entity['id']) => Promise<FileEntity[]>
}