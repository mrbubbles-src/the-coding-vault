import { multiRoleGuard } from '@/lib/auth';

const AllEntriesPage = async () => {
  const user = await multiRoleGuard(['SUPERADMIN', 'MODERATOR']);

  return <div>AllEntriesPage</div>;
};

export default AllEntriesPage;
