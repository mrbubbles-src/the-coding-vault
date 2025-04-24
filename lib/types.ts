export type TRole = 'SUPERADMIN' | 'MODERATOR' | 'GUEST';

export interface IJWT {
  id: string;
  role: TRole;
}

export interface IInputs {
  username: string;
  password: string;
}
