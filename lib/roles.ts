const canDeleteEntry = (role: string) => {
  return role === 'SUPERADMIN';
};

const canManageUsers = (role: string) => {
  return role === 'SUPERADMIN';
};

const canSubmitEntry = (role: string) => {
  return ['SUPERADMIN', 'MODERATOR', 'GUEST'].includes(role);
};

const canViewEntries = (role: string) => {
  return ['SUPERADMIN', 'MODERATOR', 'GUEST'].includes(role);
};

const getAdminPrefix = (role: string) => {
  if (role === 'SUPERADMIN') return '/admin/dashboard';
  if (role === 'MODERATOR') return '/admin/mod/dashboard';
  if (role === 'GUEST') return '/admin/guest/dashboard';
  return '/admin/login'; // fallback für unknown roles
};
export {
  canDeleteEntry,
  canManageUsers,
  canSubmitEntry,
  canViewEntries,
  getAdminPrefix,
};
