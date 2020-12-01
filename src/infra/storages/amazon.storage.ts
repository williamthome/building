import { config, S3 } from 'aws-sdk'
import { Inject, Injectable } from '@/shared/dependency-injection'
import { Storage } from '../protocols'
import { StorageDownloadFile, StorageUploadFile } from '@/data/protocols'

@Injectable('storage')
export class AmazonStorage implements Storage {

  constructor (
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

  upload = async (
    file: StorageUploadFile,
    buffer: StorageDownloadFile['buffer'],
    fileName: string
  ): Promise<StorageDownloadFile['url'] | Error> => {
    try {
      const path: string = [
        file.reference,
        file.referenceId,
        fileName
      ].join('/')
      const key = encodeURI(path)

      const { Location: url } = await new S3.ManagedUpload({
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: buffer,
          ContentType: file.mimeType
        }
      }).promise()

      return url
    } catch (error) {
      console.error(error)
      return error
    }
  }

  download = async (url: StorageDownloadFile['url']): Promise<StorageDownloadFile | null> => {
    const response = await new S3().getObject({
      Bucket: this.bucket,
      Key: url
    }).promise()

    const { Body, ContentType } = response

    return Body instanceof Buffer && typeof ContentType === 'string'
      ? {
        url: decodeURI(url),
        buffer: Body,
        mimeType: ContentType
      }
      : null
  }
}