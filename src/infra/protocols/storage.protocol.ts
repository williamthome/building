export interface Storage {
  upload: (fileName: string, fileData: any) => Promise<void>
  download: (fileName: string) => Promise<void>
}