import { Property, CreatePropertyDto, UpdatePropertyDto } from '@/domain/entities'

export type PropertyData = Property

export type CreatePropertyData = CreatePropertyDto & Pick<PropertyData, 'companyId'>

export type UpdatePropertyData = UpdatePropertyDto
