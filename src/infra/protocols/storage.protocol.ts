export interface Storage {
  upload: (fileName: string, fileData: any) => Promise<void>
}