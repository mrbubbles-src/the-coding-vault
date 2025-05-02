import { multiRoleGuard } from '@/lib/auth';

const DeleteEntryPage = async () => {
  const user = await multiRoleGuard(['SUPERADMIN']);

  return <div>DeleteEntryPage</div>;
};

export default DeleteEntryPage;
