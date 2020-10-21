import { TargetType } from '../types'
import { IProperty } from './property.interface'

export interface IClass<T> {
  target: TargetType<T>
  properties: IProperty<T>[]
}