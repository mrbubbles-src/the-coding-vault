import { multiRoleGuard } from '@/lib/auth';

const DeleteUserPage = async () => {
  const user = await multiRoleGuard(['SUPERADMIN']);

  return <div>DeleteUserPage</div>;
};

export default DeleteUserPage;
