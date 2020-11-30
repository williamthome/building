import { MemberModel } from '../models/nested'

export type MemberModelDto = Partial<Omit<MemberModel, 'userId'>>