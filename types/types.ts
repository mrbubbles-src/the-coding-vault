import { JWTPayload } from 'jose';

export type TRole = 'SUPERADMIN' | 'MODERATOR' | 'GUEST';

export interface IJWT {
  id: string;
  username: string;
  role: TRole;
}

export interface IInputs {
  username: string;
  password: string;
}

export interface IVaultEntry {
  id: string;
  numericId: number;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  category: string;
  authorId: string;
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
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

export interface ICategories {
  id: string;
  name: string;
  slug: string;
  iconKey: TIconKey;
  order: number;
  entries?: Array<IVaultEntry>;
}

export type UserResult =
  | { user: IJWT & JWTPayload }
  | { error: 'no-token' | 'invalid-token' | 'server-error' };
