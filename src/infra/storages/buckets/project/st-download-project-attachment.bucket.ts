import { Inject, Injectable } from '@/shared/dependency-injection'
import { DownloadProjectAttachmentBucket } from '@/data/buckets'
import { Storage } from '@/infra/protocols'
import { FileData, ProjectData } from '@/data/models'

@Injectable('downloadProjectAttachmentBucket')
export class StDownloadProjectAttachmentBucket implements DownloadProjectAttachmentBucket {
  constructor(@Inject('storage') private readonly storage: Storage) {}

  downloadProjectAttachment = async (
    projectId: ProjectData['id'],
    fileName: FileData['name']
  ): Promise<Buffer> => {
    return await this.storage.download({
      reference: 'projects',
      referenceId: projectId,
      name: fileName
    })
  }
}
