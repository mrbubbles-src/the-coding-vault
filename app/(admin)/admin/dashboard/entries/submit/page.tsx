import SubmitEntryClient from '@/components/layout/vaultEditor/submit-entry-client';
import { multiRoleGuard } from '@/lib/auth';

const SubmitEntryPage = async () => {
  await multiRoleGuard(['SUPERADMIN', 'MODERATOR', 'GUEST']);

  return <SubmitEntryClient />;
};

export default SubmitEntryPage;
