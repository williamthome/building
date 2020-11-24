import { Member } from '../entities/nested'

export type MemberDto = Partial<Omit<Member, 'userId'>>