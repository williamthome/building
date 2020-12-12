export interface Validation {
  validate: (key: string, value: any) => void | string
}

export type ValidateOptions = {
  customMessage?: string
}

export abstract class Validate<TValidation extends Validation> implements Validation {
  constructor (protected readonly opts: ValidateOptions | undefined) { }

  protected abstract readonly validation: () => TValidation

  abstract validate: (key: string, value: any) => void | string
}