import { multiRoleGuard } from '@/lib/auth';

const AllUsersPage = async () => {
  const user = await multiRoleGuard(['SUPERADMIN']);

  return <div>AllUsersPage</div>;
};

export default AllUsersPage;
