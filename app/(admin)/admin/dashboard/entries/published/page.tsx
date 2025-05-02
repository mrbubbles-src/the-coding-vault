import { multiRoleGuard } from '@/lib/auth';

const PublishedEntriesPage = async () => {
  const user = await multiRoleGuard(['SUPERADMIN', 'MODERATOR', 'GUEST']);

  return <div>PublishedEntriesPage</div>;
};

export default PublishedEntriesPage;
