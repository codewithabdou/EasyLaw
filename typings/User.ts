export type UserDataCookies = {
  token: string;
  user: User;
  canAccess: string[];
};

export type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  active: boolean;
};
