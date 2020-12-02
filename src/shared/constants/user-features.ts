export enum UserFeatures {
  None = 0,
  ManageBuildings = 1 << 0,
  ManageProjects = 1 << 1,
  ManageUsers = 1 << 2,
  ManageCompanyData = 1 << 3,
  ManagePhases = 1 << 4
}

/**
 * All = sum = 1+2+4+8+16 = 31
 */
export const AllUserFeatures: UserFeatures =
  UserFeatures.ManageBuildings   | // 1
  UserFeatures.ManageProjects    | // 2
  UserFeatures.ManageUsers       | // 4
  UserFeatures.ManageCompanyData | // 8
  UserFeatures.ManagePhases        // 16