import { multiRoleGuard } from '@/lib/auth';

const SubmitEntryPage = async () => {
  const user = await multiRoleGuard(['SUPERADMIN', 'MODERATOR', 'GUEST']);

  return <div>SubmitEntryPage</div>;
};

export default SubmitEntryPage;
