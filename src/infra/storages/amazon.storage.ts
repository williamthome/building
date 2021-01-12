import { config, S3 } from 'aws-sdk'
import { Inject, Injectable } from '@/shared/dependency-injection'
import { Storage, StorageDownloadFile, StorageUploadFile } from '../protocols'
import { createFilePath } from '../helpers/storage.helper'

@Injectable('storage')
export class AmazonStorage implements Storage {
  constructor(
    @Inject('AWS_ACCESS_KEY_ID')
    private readonly accessKeyId: string,

    @Inject('AWS_SECRET_ACCESS_KEY')
    private readonly secretAccessKey: string,

    @Inject('AWS_REGION')
    private readonly region: string,

    @Inject('AWS_BUCKET')
    private readonly bucket: string
  ) {
    config.update({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey
      }
    })
  }

  upload = async (file: StorageUploadFile, buffer: Buffer): Promise<void | Error> => {
    try {
      const key = createFilePath(file).encode()
      await new S3.ManagedUpload({
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: buffer,
          ContentType: file.mimeType
        }
      }).promise()
    } catch (error) {
      console.error(error)
      return error
    }
  }

  download = async (file: StorageDownloadFile): Promise<Buffer> => {
    const path = createFilePath(file)

    const response = await new S3()
      .getObject({
        Bucket: this.bucket,
        Key: path.encode()
      })
      .promise()

    const { Body, ContentType } = response

    if (Body instanceof Buffer && typeof ContentType === 'string') return Body // Body.toString('base64')

    throw new Error(`Invalid file format for file ${file.name} in ${file.reference}`)
  }
}
