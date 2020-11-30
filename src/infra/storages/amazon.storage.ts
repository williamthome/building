import { Inject, Injectable } from '@/shared/dependency-injection'
import { Storage } from '../protocols'
import { config, S3 } from 'aws-sdk'

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

  upload = async (fileName: string, fileData: any): Promise<void> => {
    const response = await new S3.ManagedUpload({
      params: {
        Bucket: this.bucket,
        Key: fileName,
        Body: fileData
      }
    }).promise()
    console.log(`File uploaded at ${response.Location}`)
  }

  download = async (filename: string): Promise<void> => {
    const response = await new S3().getObject({
      Bucket: this.bucket,
      Key: filename
    }).promise()
    console.log(`File download size ${response.ContentLength}`)
  }
}