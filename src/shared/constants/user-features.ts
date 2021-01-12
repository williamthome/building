export enum UserFeatures {
  None = 0,
  ManageBuildings = 1 << 0,
  ManageProjects = 1 << 1,
  ManageUsers = 1 << 2,
  ManageCompanyData = 1 << 3,
  ManagePhases = 1 << 4,
  ManageCustomers = 1 << 5,
  ManageProperties = 1 << 6,
  ManageTechnicians = 1 << 7
}

/**
 * All = sum = 1+2+4+8+16+32+64+128 = 255
 */
export const AllUserFeatures: UserFeatures =
  UserFeatures.ManageBuildings | // 1
  UserFeatures.ManageProjects | // 2
  UserFeatures.ManageUsers | // 4
  UserFeatures.ManageCompanyData | // 8
  UserFeatures.ManagePhases | // 16
  UserFeatures.ManageCustomers | // 32
  UserFeatures.ManageProperties | // 64
  UserFeatures.ManageTechnicians // 128
