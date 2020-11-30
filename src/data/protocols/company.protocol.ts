import { ModelDto } from './model.protocol'
import { CompanyModel } from '../models'

export type CompanyModelDto = ModelDto<CompanyModel>

export type CompanyModelMembers = Pick<CompanyModel, 'id' | 'members'>