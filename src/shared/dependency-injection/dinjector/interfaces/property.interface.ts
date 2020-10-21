import { ClassModel } from '../models'

export interface IProperty<T> {
  parent: ClassModel<T>
  propertyName: string
  propertyDescriptor: PropertyDescriptor
  propertyIndex: number
  value?: any
}