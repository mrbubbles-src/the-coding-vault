export type TRole = 'SUPERADMIN' | 'MODERATOR' | 'GUEST';

export interface IJWT {
  id: string;
  role: TRole;
}

export interface IInputs {
  username: string;
  password: string;
}

export type TIconKey =
  | 'git'
  | 'github'
  | 'node'
  | 'html'
  | 'css'
  | 'js'
  | 'react'
  | 'backend'
  | 'database'
  | 'default';
