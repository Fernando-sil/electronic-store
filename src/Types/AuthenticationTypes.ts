export type TLogin = {
  userName: string;
  password: string;
};

export type TLoginResponse = {
  id: string;
  userName: string;
  emailAddress: string;
  confirmedEmail: boolean;
  role: string;
  isActive: boolean;
  token: string;
};

export type TUsers = {
  id: string;
  userName: string;
  role: string;
};

export type TUpdateUSer = {
  role: string;
  isActive: boolean;
};

export type TUpdateUserForm = {
  id: string;
  data: TUpdateUSer;
};
