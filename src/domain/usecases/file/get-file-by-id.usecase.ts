import { File } from '@/domain/entities'

export interface GetFileByIdUseCase {
  call: (id: File['id']) => Promise<File | null>
}