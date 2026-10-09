export type UserRole = "CREATOR" | "BRAND";

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  creatorId?: string;
  brandId?: string;
  createdAt?: string;
}

export interface Brand {
  brandId: string;
  uid: string;
  companyName: string;
  industry: string;
  website?: string;
  logo?: string;
  description: string;
  location: string;
  activeBriefsCount: number;
  totalApplicationsCount: number;
}
