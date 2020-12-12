import { Customer, CreateCustomerDto, UpdateCustomerDto } from '@/domain/entities'

export type CustomerData = Customer

export type CreateCustomerData = CreateCustomerDto & Pick<CustomerData, 'companyId'>

export type UpdateCustomerData = UpdateCustomerDto