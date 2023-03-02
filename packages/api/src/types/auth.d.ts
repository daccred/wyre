export interface User {
  id?: string;
  name?: string;
  email?: string;
  userType?: string;
  phone?: string;
  password?: string;
  emailVerified?: boolean;
  image?: string;
  jobRole?: string;
  category?: string;
  companyId?: string;
}

declare module "next-auth" {
  // interface User {
  //   id?: string;
  //   name?: string;
  //   email?: string;
  //   userType?: string;
  //   phone?: string;
  //   password?: string;
  //   emailVerified?: boolean;
  //   image?: string;
  //   jobRole?: string;
  //   category?: string;
  //   companyId?: string;
  // }

  interface Session {
    user: User;
    expires: ISODateString;
  }
}
