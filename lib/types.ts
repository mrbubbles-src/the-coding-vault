export type TRole = 'SUPERADMIN' | 'MODERATOR' | 'GUEST';

export type TJWT = { id: string; role: TRole };
