export type Entity = { id: string }

export type EntityDto<T extends Entity> = Partial<Omit<T, 'id'>>