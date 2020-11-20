import { UserFeatures } from '../constants'

export const hasFeatures = (
  have: UserFeatures | number,
  needed: UserFeatures | number
): boolean => {
  return (have & needed) === needed
}