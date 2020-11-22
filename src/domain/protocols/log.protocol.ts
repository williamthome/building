import { LogErrorEntity } from '../entities'

export type LogErrorDto = Omit<LogErrorEntity, 'id'>