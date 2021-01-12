export interface Validation<T> {
  validate: (obj: T, key: keyof T) => void | string
}

export type ValidateOptions = {
  customMessage?: string
}

export abstract class Validate<T, TValidation extends Validation<T>> implements Validation<T> {
  constructor(protected readonly opts: ValidateOptions | undefined) {}

  protected abstract readonly validation: () => TValidation

  abstract validate: (obj: T, key: keyof T) => void | string
}
