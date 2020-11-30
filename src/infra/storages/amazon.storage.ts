import { Inject, Injectable } from '@/shared/dependency-injection'
import { Storage } from '../protocols'
import { S3 } from 'aws-sdk'

@Injectable('storage')
export class AmazonStorage implements Storage {
  private s3: S3

  constructor (
    @Inject('AWS_ACCESS_KEY_ID') accessKeyId: string,
    @Inject('AWS_SECRET_ACCESS_KEY') secretAccessKey: string,
    @Inject('AWS_REGION') region: string,
    @Inject('AWS_BUCKET') private readonly bucket: string
  ) {
    this.s3 = new S3({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    })
  }

  upload = async (fileName: string, fileData: any): Promise<void> => {
    const response = await this.s3.upload({
      Bucket: this.bucket,
      Key: fileName,
      Body: fileData
    }).promise()
    console.log(`File uploaded at ${response.Location}`)
  }
}