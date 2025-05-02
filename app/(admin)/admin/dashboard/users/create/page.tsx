import { multiRoleGuard } from '@/lib/auth';

const CreateUserPage = async () => {
  const user = await multiRoleGuard(['SUPERADMIN']);

  return <div>CreateUserPage</div>;
};

export default CreateUserPage;
