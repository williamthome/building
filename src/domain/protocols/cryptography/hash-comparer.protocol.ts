export interface HashComparer {
  match: (plaintext: string, digest: string) => Promise<boolean>
}