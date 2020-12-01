import { StorageUploadFile } from '../protocols'

export const createFilePath = (
  file: Pick<StorageUploadFile, 'reference' | 'referenceId' | 'name'>
): CreatePathOptions => {
  const path: string = [
    file.reference,
    file.referenceId,
    file.name
  ].join('/')
  return new CreatePathOptions(path)
}

class CreatePathOptions {
  constructor (private readonly path: string) { }
  encode = (): string => encodeURI(this.path)
  decode = (): string => decodeURI(this.path)
}