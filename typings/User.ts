export type UserDataCookies = {
  userId: string;
  token: string;
  role: string;
};

export type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  active: boolean;
};
